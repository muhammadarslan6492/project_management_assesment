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

import db from './config/db'
import Router from './modules/router/index'
import './config/passport'

config()

const swaggerDocument = YAML.load('./swagger.yaml')
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'JOB-ASSESMENT',
}

const port = process.env.PORT || 3000
const app = new Express()
const httpServer = http.createServer(app)

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

app.get('/', (req, res) => {
  res.status(200).json({ meg: 'Api is working' })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

try {
  db()

  app.use('/', Router)

  httpServer.listen(port, () => {
    const msg = `up and running in ${
      process.env.NODE_ENV || 'development'
    } @: ${os.hostname()} on port: ${port}}`
    console.info(msg)
  })
} catch (err) {
  console.log(err)
}
