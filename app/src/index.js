import Express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as os from 'os'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import helment from 'helmet'
import passport from 'passport'
import session from 'express-session'
import * as path from 'path'

import db from './config/db'
import Router from './modules/router/index'
import './config/passport'
import sendPush from './modules/jobs/reminderPush'
import Socket from './config/socket'

config()

const swaggerDocument = YAML.load('./swagger.yaml')
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'JOB-ASSESMENT',
}

const port = process.env.PORT
const app = new Express()

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

const httpServer = http.createServer(app)
const socketServer = new Socket(httpServer)

const root = path.normalize(`${__dirname}/../..`)
app.set('appPath', `${root}client`)
app.use(Express.static(`${root}/public`))

// app middlewares

app.use(helment())

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(
  cors({
    origin: '*',
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '1000kb' }))
app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '1000kb' }))
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '1000kb',
  })
)

// swagger api docs >>> localhost:1337/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

try {
  db()

  app.use('/', Router)

  sendPush()

  httpServer.listen(port, () => {
    const msg = `up and running in ${
      process.env.NODE_ENV || 'development'
    } @: ${os.hostname()} on port: ${port}}`
    console.info(msg)
  })
} catch (err) {
  console.log(err)
}

export default socketServer
