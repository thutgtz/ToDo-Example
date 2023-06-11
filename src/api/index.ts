import { Application } from 'express'
import usersRouter from './users/usersRouter'
import tasksRouter from './tasks/tasksRouter'
import commentsRouter from './comments/commentsRouter'

import env from '../env'

const { prefix } = env
const appendPrefix = (routeName: string) => `/${prefix}/${routeName}`

const createApi = async (app: Application) => {
  app.use(appendPrefix('users'), usersRouter)
  app.use(appendPrefix('tasks'), tasksRouter)
  app.use(appendPrefix('comments'), commentsRouter)
}

export default createApi
