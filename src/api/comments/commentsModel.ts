import type { Knex } from 'knex'
import moment from 'moment'
import { v4 } from 'uuid'
import { Knex as knex } from '../../knex'
import TableName from '../../knex/tableName'

class CommentsModel {
  async createComment(
    {
      taskId,
      ownerId,
      content,
    }: {
      taskId: string
      ownerId: string
      content: string
    },
    transaction?: Knex.Transaction
  ) {
    const commentId = v4()
    const timestamp = moment()
    await (transaction ?? knex)(TableName.COMMENTS).insert({
      commentId,
      taskId,
      ownerId,
      content,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    return commentId
  }

  getComment(condition: Record<string, any>, transaction?: Knex.Transaction) {
    return (transaction ?? knex)(TableName.COMMENTS)
      .where(condition)
      .orderBy('createdAt', 'asc')
  }
}

export default new CommentsModel()
