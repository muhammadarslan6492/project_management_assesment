import express from 'express'
import passport from 'passport'

import Controller from './controller'
import validate from '../midleware/validators'

const router = express.Router()

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
}

// this end point is used for both signup and login purpose FROM 'USER'
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failed',
  }),
  (req, res) => {
    res.redirect('/auth/success')
  }
)
router.get('/success', isLoggedIn, Controller.signupSuccess)
router.get('/failed', Controller.signupFail)

router.post('/admin-signup', validate.SignupValidator, Controller.adminSignup)
router.get('/verify/:JWT', Controller.verify)
router.post('/resend-verifcation', Controller.resend)
router.post('/admin-login', validate.LoginValidator, Controller.adminSignin)

export default router
