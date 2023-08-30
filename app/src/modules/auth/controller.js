import service from './service'

export default {
  signupFail: (req, res) => {
    try {
      return res.send('Failed')
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  signupSuccess: async (req, res) => {
    try {
      const { user } = req
      const payload = {
        displayName: user.displayName,
        email: user.emails[0].value,
        isVerified: user.emails[0].verified,
        picture: user.photos[0].value,
      }
      const response = await service.craeteUser(payload)
      return res.status(response.statusCode).json({
        user: response.user,
        token: response.token,
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  adminSignup: async (req, res) => {
    try {
      const { body } = req
      const response = await service.adminSignup(body)
      return res.status(response.statusCode).json({ message: response.message })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  verify: async (req, res) => {
    try {
      const { JWT } = req.params
      const response = await service.verifyAccount(JWT)
      return res.status(response.statusCode).json({ message: response.message })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  resend: async (req, res) => {
    try {
      const { email } = req.body
      const response = await service.resendVerification(email)
      return res.status(response.statusCode).json(response)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  adminSignin: async (req, res) => {
    try {
      const { email, password } = req.body
      const response = await service.login(email, password)
      return res
        .status(response.statusCode)
        .json({ user: response.user, token: response.token })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
}
