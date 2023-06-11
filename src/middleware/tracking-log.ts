import { Request, Response, NextFunction } from 'express'
import moment from 'moment'
import { logger, debug, error as err } from '../config/debug'

const getResponseBody = (res: Response, cb: (chunk: Buffer[]) => void) => {
  const oldWrite = res.write
  const oldEnd = res.end
  const chunks: Buffer[] = []

  res.write = (chunk: any, callback?: any) => {
    try {
      if (chunk && Buffer.isBuffer(chunk)) chunks.push(chunk)
      return oldWrite.apply(res, [chunk, callback])
    } catch (e) {
      if (callback) callback(new Error(JSON.stringify(e)))
      return false
    }
  }

  res.end = (chunk: any, callback?: any) => {
    if (chunk && Buffer.isBuffer(chunk)) chunks.push(chunk)
    cb(chunks.length ? chunks : chunk)
    return oldEnd.apply(res, [chunk, callback])
  }
}

const toJson = (string: string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return string
  }
}

function trackingLog(req: Request, res: Response, next: NextFunction) {
  const requestTime = moment()
  debug(
    `%s start origin %o`,
    requestTime.format('YYYY-MM-DD HH:mm:ss'),
    req.originalUrl
  )

  let responseBody: any = {}
  let statusCode = 200
  getResponseBody(res, (chunks) => {
    statusCode = res.statusCode
    if (!/utf-8/i.test(res.getHeaders()['content-type'] as string)) {
      responseBody = {}
    } else if (Array.isArray(chunks)) {
      responseBody = toJson(Buffer.concat(chunks).toString('utf8'))
    } else {
      responseBody = toJson(chunks)
    }
  })
  res.on('finish', () => {
    const { params } = req
    const { error, result } = responseBody
    const tmp = { ...responseBody, result: JSON.stringify(result) }
    delete responseBody.error
    const logObj = {
      url: req.originalUrl,
      ip: req.headers['x-forwarded-for']
        ? (req.headers['x-forwarded-for'] as string).split(',')[0]
        : req.ip,
      user: (req as any).cuscode,
      request_time: requestTime,
      response_time: moment(),
      response_status: statusCode,
      body: JSON.stringify(params ? req.body : { ...req.body, params }),
      response: tmp,
    }
    if (statusCode === 200) {
      debug(
        `%s end origin %o %s`,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        req.originalUrl
      )
      logger.info(JSON.stringify(logObj))
    } else {
      err(
        `%s end origin %o %s`,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        req.originalUrl,
        `\n${error}`
      )
      logger.error(JSON.stringify(logObj))
    }
  })
  next()
}

export default trackingLog
