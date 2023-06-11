import type { Knex } from 'knex'
import moment from 'moment'
import { v4 } from 'uuid'
import { Knex as knex } from '../../knex'
import TableName from '../../knex/tableName'

class TasksModel {
  async updateTask(
    {
      update,
      condition,
    }: {
      update: Record<string, any>
      condition: Record<string, any>
    },
    transaction?: Knex.Transaction
  ) {
    return (transaction ?? knex)(TableName.TASKS)
      .update(update)
      .where(condition)
  }

  async createTasks(
    {
      ownerId,
      title,
      description,
      status,
    }: {
      ownerId: string
      title: string
      description: string
      status: 'To Do' | 'In Progress' | 'Done'
    },
    transaction?: Knex.Transaction
  ) {
    const taskId = v4()
    const timestamp = moment()
    await (transaction ?? knex)(TableName.TASKS).insert({
      taskId,
      title,
      description,
      status,
      ownerId,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    return taskId
  }

  getTasks(
    {
      condition,
      offset,
      limit = 3,
    }: {
      condition?: Record<string, any>
      offset: number
      limit: number
    },
    transaction?: Knex.Transaction
  ) {
    return (transaction ?? knex)(TableName.TASKS)
      .where(condition ?? {})
      .orderBy('createdAt', 'asc')
      .limit(limit)
      .offset(offset)
  }
}

export default new TasksModel()
