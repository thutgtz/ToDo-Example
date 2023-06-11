import Joi from 'joi'

export const schemaCreateTask = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
})

export const schemaUpdateStatusTask = Joi.object({
  status: Joi.string().required(),
})

export const schemaGetTask = Joi.object({
  offset: Joi.number().required(),
  limit: Joi.number(),
})
