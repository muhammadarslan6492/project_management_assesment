import { config } from 'dotenv'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SCREET,
            callbackURL: 'http://localhost:1337/auth/google/callback',
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile)
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})
