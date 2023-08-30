import cron from 'node-cron'
import moment from 'moment'

import { Project } from '../model/index'

const sendPush = () => {
  // cron.schedule('* * * * * *', async () => {
  //   const project = await Project.find({ 'cards.status': 'Inprogress' })
  //   // console.log('ss')
  //   // console.log(project)
  //   // const cards = project.cards
  //   // for (let card of cards) {
  //   //   console.log(card)
  //   // }
  // })
}
export default sendPush
