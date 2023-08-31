import cron from 'node-cron'
import moment from 'moment'

import { User } from '../model/index'
import socketServer from '../../index'
import pushNotification from '../utils/firebasePushNotification'

import { Reminder } from '../model/index'

const sendPush = () => {
  cron.schedule('* * * * * *', async () => {
    const reminders = await Reminder.find({
      date: { $gte: Date.now() },
      reminderSurve: false,
    })
    for (let reminder of reminders) {
      const date = moment()
      const reminderTime = moment(reminder.date)
      const diff = reminderTime.diff(date, 'minutes')
      if (diff === 1) {
        await Reminder.findByIdAndUpdate(
          { _id: reminder },
          { reminderSurve: true },
          {
            new: true,
          }
        )
        const reminderData = {
          todo: reminder.todo,
          message: reminder.message,
        }
        const user = await User.findOne({ _id: reminder.user })
        const pushToken = user.pushToken
        const isSent = socketServer.generateReminder(
          reminder.user,
          reminderData
        )
        if (!isSent) {
          const msg = {
            data: reminderData,
            token: pushToken,
          }
          pushNotification(msg)
        }
      }
    }
  })
}
export default sendPush
