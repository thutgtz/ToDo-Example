import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { failed } from '../config/response'

const validateSchema =
  (schema: Joi.ObjectSchema[] = [], properties = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (typeof schema !== 'object') {
      return failed({ res, message: `schema supported array only` })
    }
    for (let x = 0; x < schema.length; x += 1) {
      const { error } = schema[x].validate(req[properties as keyof Request])
      if (error) return failed({ res, message: error.details[0].message })
    }
    return next()
  }

export default validateSchema
