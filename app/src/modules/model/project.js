import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({
  todo: String,
  status: {
    type: String,
    values: ['Inprogress', 'Done'],
    default: 'Inprogress',
  },
  priority: {
    type: String,
    values: ['Low', 'High'],
  },
})

const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  cards: [cardSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Proejct = mongoose.model('Project', projectSchema)

export default Proejct
