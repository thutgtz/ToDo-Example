import { Router } from 'express'
import validateSchema from '../../middleware/validate-schema'
import validateToken from '../../middleware/validate-token'
import CommentsController from './commentsController'
import { schemaCreateComment } from './commentsSchema'

const router = Router()

router.get('/:taskId', validateToken, CommentsController.getComment)

router.put(
  '/:taskId',
  validateSchema([schemaCreateComment]),
  validateToken,
  CommentsController.createComment
)

export default router
