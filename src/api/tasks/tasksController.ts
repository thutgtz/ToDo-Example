import { Request, Response } from 'express'
import moment from 'moment'
import { failed, success } from '../../config/response'
import { haddleErrorMessage } from '../../helpers/functions'
import Transaction from '../../knex/transaction'
import tasksModel from './tasksModel'

class TasksController {
  async createTask(req: Request, res: Response) {
    const transaction = new Transaction()
    try {
      await transaction.createTransaction()

      const { userId } = req as any
      const { title, description } = req.body

      const taskId = await tasksModel.createTasks(
        {
          ownerId: userId,
          title,
          description,
          status: 'To Do',
        },
        transaction.transaction
      )

      await transaction.endTransaction()
      return success({
        res,
        message: 'create tasks success.',
        result: { taskId },
      })
    } catch (error) {
      await transaction.rollBackTransaction()
      return failed({
        res,
        message: 'create tasks failed.',
        error: haddleErrorMessage(error),
      })
    }
  }

  async keepTask(req: Request, res: Response) {
    const transaction = new Transaction()
    try {
      await transaction.createTransaction()
      const { taskId } = req.params
      const timestamp = moment()

      if (!taskId) throw new Error('no taskId.')
      await tasksModel.updateTask(
        {
          update: { isKeep: true, updatedAt: timestamp },
          condition: { taskId },
        },
        transaction.transaction
      )

      await transaction.endTransaction()
      return success({
        res,
        message: 'keep tasks success.',
        result: {},
      })
    } catch (error) {
      await transaction.rollBackTransaction()
      return failed({
        res,
        message: 'keep tasks failed.',
        error: haddleErrorMessage(error),
      })
    }
  }

  async updateStatusTask(req: Request, res: Response) {
    const transaction = new Transaction()
    try {
      await transaction.createTransaction()
      const { taskId } = req.params
      const { status } = req.body
      const timestamp = moment()

      if (!taskId) throw new Error('no taskId.')
      if (!['To Do', 'In Progress', 'Done'].includes(status))
        throw new Error('invalid status.')

      await tasksModel.updateTask(
        {
          update: { status, updatedAt: timestamp },
          condition: { taskId },
        },
        transaction.transaction
      )

      await transaction.endTransaction()
      return success({
        res,
        message: 'update tasks success.',
        result: {},
      })
    } catch (error) {
      await transaction.rollBackTransaction()
      return failed({
        res,
        message: 'update tasks failed.',
        error: haddleErrorMessage(error),
      })
    }
  }

  async getTask(req: Request, res: Response) {
    try {
      const { userId } = req as any
      const { offset, limit } = req.query
      const tasksList = await tasksModel.getTasks({
        condition: { ownerId: userId, isKeep: false },
        offset: +(offset ?? 0),
        limit: +(limit ?? 3),
      })
      return success({
        res,
        message: 'get tasks success.',
        result: tasksList,
      })
    } catch (error) {
      return failed({
        res,
        message: 'get tasks failed.',
        error: haddleErrorMessage(error),
      })
    }
  }
}

export default new TasksController()
