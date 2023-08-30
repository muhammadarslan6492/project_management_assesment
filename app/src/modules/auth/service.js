import jwt from 'jsonwebtoken'
import { Conflict, BadRequest, NotFound } from 'fejl'

import Repo from '../repo/index'
import { User } from '../model/index'
import sendEmail from '../utils/signupEmail'
import utilities from '../utils/utilities'

class Service extends Repo {
  constructor() {
    super(User)
  }

  async craeteUser(payload) {
    // check existed user
    const existedUser = await this.findOne({ email: payload.email })
    if (existedUser) {
      console.log(existedUser)
      const user = { ...existedUser._doc }
      delete user.password
      const token = utilities.createToken(user, process.env.secret)
      const response = {
        statusCode: 200,
        user,
        token,
      }
      return response
    }
    let response = await this.create(payload)
    const user = { ...response._doc }
    delete user.password
    const token = utilities.createToken(user, process.env.secret)
    response = {
      statusCode: 201,
      user,
      token,
    }
    return response
  }

  async adminSignup(payload) {
    const existedUser = await this.findOne({ email: payload.email })
    if (existedUser) {
      throw new Conflict('User already exist in the system with this email')
    }
    const hash = await utilities.genHash(payload.password, 10)
    payload.role = 'ADMIN'
    payload.password = hash
    const user = await this.create(payload)
    const mailData = {
      to: user.email,
      id: user._id,
    }
    await sendEmail(mailData)
    const response = {
      statusCode: 201,
      message: 'Verification link sent to your emai please verify your account',
    }
    return response
  }

  async verifyAccount(token) {
    const decoded = jwt.decode(token, process.env.secret)
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      throw new BadRequest('Your Link is Expire')
    }
    let user = await this.findOne({ _id: decoded.id, isVerified: false })
    if (user && user.isVerified === true) {
      throw new Conflict('User already verified')
    }
    user = await this.updateOne({ _id: decoded.id }, { isVerified: true })

    return {
      statusCode: 200,
      message: 'user verified................',
    }
  }

  async resendVerification(email) {
    const user = await this.findOne({ email })
    if (!user) {
      throw new Conflict('User not exist with the email')
    }
    const mailData = {
      to: user.email,
      id: user._id,
    }
    await sendEmail(mailData)
    return {
      statusCode: 200,
      message: 'Verification link sent to your email',
    }
  }

  async login(email, password) {
    let user = await this.findOne({ email })
    if (user.role !== 'ADMIN') {
      throw new BadRequest('UnAuthorized')
    }
    if (!user) {
      throw new NotFound('Email or password invalid')
    }
    if (user.isVerified === false) {
      throw new Conflict('You are not verify your account yet.')
    }
    const compare = await utilities.compare(password, user.password)
    if (!compare) {
      throw new Conflict('Email or password invalid')
    }

    user = {
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      isVerified: user.isVerified,
      role: user.role,
    }
    const token = utilities.createToken(user, process.env.secret)
    const response = {
      statusCode: 200,
      user,
      token,
    }
    return response
  }
}

export default new Service()
