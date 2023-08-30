import mongoose from 'mongoose'

const reminderSchema = mongoose.Schema({
  date: Date,
  message: String,
  user: String,
  card: String,
  project: String,
  todo: String,
})

const Reminder = mongoose.model('Reminder', reminderSchema)

export default Reminder
