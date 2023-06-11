import express from 'express'
import cors from 'cors'
import ratelimit from 'express-rate-limit'
import helmet from 'helmet'
import moment from 'moment'
import createApi from './src/api/index'
import { debug } from './src/config/debug'
import env from './src/env'
import trackingLog from './src/middleware/tracking-log'
import { connectToDB } from './src/knex'

require('moment/locale/th')

if (!env.appName && !env.name) {
  throw new Error('Please config env.name or APP_NAME in .env')
}

const app = express()

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
}
const rateLimit = {
  windowMs: 60 * 1000,
  max: 200,
}

/* ###################### SETTIN MIDDLEWERE ###################### */
app.disable('etag')
app.use(helmet())
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(ratelimit(rateLimit))

app.use((req, _, next) => {
  const { ip } = req
  ;(req as any).request_time = moment()
  debug('client IP is', ip.replace(/[:f ]/g, ''))
  debug(`api is callled %o`, req.baseUrl + req.path)
  next()
})
app.use(trackingLog)

/* ###################### CREATE API ###################### */
createApi(app)

app.listen(env.port, async () => {
  connectToDB()
  debug(`[${env.node}] ::: Server is running port ${env.port}`)
})
