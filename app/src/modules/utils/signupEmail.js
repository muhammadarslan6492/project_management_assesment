import sgMail from '@sendgrid/mail'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

sgMail.setApiKey(process.env.SEND_GRID_KEY)

const sendEmail = async (obj) => {
  try {
    const token = jwt.sign({ id: obj.id }, process.env.secret, {
      expiresIn: 36000,
    })
    const msg = {
      to: obj.to,
      from: process.env.EMAIL,
      subject: 'Welcome to the Job Assesment',
      html: `<p><b>Hi,</b></p><br/><p>Thank you for registring with us. Please <a href="${process.env.URL}/auth/verify/${token}">verify</a> your account to access your account. Note that this link will expire after 1 hours.</p><br/><p><b>Regards,</b></p><p>Tech</p>`,
    }
    await sgMail.send(msg)
    return true
  } catch (err) {
    return false
  }
}

export default sendEmail
