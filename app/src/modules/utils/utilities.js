import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export default {
  createToken: (obj) => {
    return jwt.sign(obj, process.env.secret)
  },
  genHash: async (data) => {
    return await bcrypt.hash(data, 10)
  },

  compare: async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword)
  },
}
