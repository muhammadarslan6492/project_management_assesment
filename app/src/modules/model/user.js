import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  displayName: String,
  email: String,
  password: {
    type: String,
    default: '',
  },
  picture: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    value: ['USER', 'ADMIN'],
    default: 'USER',
  },
})

const User = mongoose.model('User', userSchema)

export default User
