import { Router } from 'express'
import validateSchema from '../../middleware/validate-schema'
import UsersController from './usersController'
import { schemaLogin, schemaRegister } from './usersSchema'

const router = Router()

router.put(
  '/register',
  validateSchema([schemaRegister]),
  UsersController.register
)

router.post('/login', validateSchema([schemaLogin]), UsersController.login)

export default router
