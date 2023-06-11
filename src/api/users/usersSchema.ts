import Joi from 'joi'

export const schemaRegister = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
})

export const schemaLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})
