import Joi from 'joi'

export const schemaCreateComment = Joi.object({
  content: Joi.string().required(),
})
