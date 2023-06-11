import type { Knex } from 'knex'
import moment from 'moment'
import { v4 } from 'uuid'
import { Knex as knex } from '../../knex'
import TableName from '../../knex/tableName'

class UsersModel {
  async createUser(
    {
      userName,
      password,
      email,
    }: {
      userName: string
      password: string
      email: string
    },
    transaction?: Knex.Transaction
  ) {
    const userId = v4()
    const timestamp = moment()
    await (transaction ?? knex)(TableName.USERS).insert({
      userId,
      userName,
      password,
      email,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    return userId
  }

  getUser(condition: Record<string, any>, transaction?: Knex.Transaction) {
    return (transaction ?? knex)(TableName.USERS).where(condition)
  }
}

export default new UsersModel()
