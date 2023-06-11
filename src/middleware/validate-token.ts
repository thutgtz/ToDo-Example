import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { failed } from '../config/response'
import env from '../env'

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers && req.headers.authorization) {
    try {
      const jwt = req.headers.authorization.replace('Bearer ', '')
      const [header, ,] = jwt.split('.')
      const { alg } = JSON.parse(Buffer.from(header, 'base64').toString())
      if (alg === 'HS256' && env.sign) {
        const decoded = jsonwebtoken.verify(jwt, env.sign) as any
        ;(req as any).userId = decoded.userId
        ;(req as any).userName = decoded.userName
        next()
      } else
        failed({
          res,
          message: 'token not found',
        })
    } catch (error) {
      failed({
        res,
        message: 'token not found',
        error: new Error(JSON.stringify(error)),
      })
    }
  } else {
    failed({ res, message: 'token not found' })
  }
}

export default validateToken
