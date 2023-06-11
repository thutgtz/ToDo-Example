import { Router } from 'express'
import validateSchema from '../../middleware/validate-schema'
import validateToken from '../../middleware/validate-token'
import TasksController from './tasksController'
import {
  schemaCreateTask,
  schemaGetTask,
  schemaUpdateStatusTask,
} from './tasksSchema'

const router = Router()

router.get(
  '',
  validateToken,
  validateSchema([schemaGetTask], 'query'),
  TasksController.getTask
)

router.put(
  '',
  validateToken,
  validateSchema([schemaCreateTask]),
  TasksController.createTask
)

router.patch(
  '/:taskId',
  validateToken,
  validateSchema([schemaUpdateStatusTask]),
  TasksController.updateStatusTask
)

router.patch('/:taskId/keep', validateToken, TasksController.keepTask)

export default router
