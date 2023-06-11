import debugging from 'debug'
import winston from 'winston'
import path from 'path'
import env from '../env'
import 'winston-daily-rotate-file'

if (!env.appName) throw new Error('no appName in .env')

export const debug = debugging('debugging:debug')
export const error = debugging('debugging:error')

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: `${env.appName.toLocaleLowerCase()}-logs` },
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(__dirname, '../logs'),
      maxFiles: '7d',
      createSymlink: true,
    }),
  ],
})
