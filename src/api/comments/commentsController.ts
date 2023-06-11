import { Request, Response } from 'express'
import { failed, success } from '../../config/response'
import Transaction from '../../knex/transaction'
import { haddleErrorMessage } from '../../helpers/functions'
import commentsModel from './commentsModel'

class UsersController {
  async getComment(req: Request, res: Response) {
    try {
      const { taskId } = req.params
      if (!taskId) throw new Error('no taskId.')
      const commentList = await commentsModel.getComment({ taskId })
      return success({
        res,
        message: 'get comments success.',
        result: commentList,
      })
    } catch (error) {
      return failed({
        res,
        message: 'get comments failed.',
        error: haddleErrorMessage(error),
      })
    }
  }

  async createComment(req: Request, res: Response) {
    const transaction = new Transaction()
    try {
      await transaction.createTransaction()
      const { taskId } = req.params
      const { userId } = req as any
      const { content } = req.body

      if (!taskId) throw new Error('no taskId.')
      const commentId = await commentsModel.createComment({
        taskId,
        ownerId: userId,
        content,
      })

      await transaction.endTransaction()
      return success({
        res,
        message: 'create comment success.',
        result: { commentId },
      })
    } catch (error) {
      await transaction.rollBackTransaction()
      return failed({
        res,
        message: 'create comment failed.',
        error: haddleErrorMessage(error),
      })
    }
  }
}

export default new UsersController()
