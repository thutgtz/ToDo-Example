import { Knex } from 'knex'
import { Knex as knex } from '.'

class Transaction {
  public transaction: Knex.Transaction | undefined

  constructor() {
    this.transaction = undefined
  }

  async createTransaction() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (!this.transaction) this.transaction = await knex.transaction()
        resolve()
      } catch (err) {
        reject()
      }
    })
  }

  async endTransaction() {
    if (this.transaction && !this.transaction?.isCompleted()) {
      return this.transaction.commit()
    }
    return null
  }

  async rollBackTransaction() {
    if (this.transaction && !this.transaction?.isCompleted()) {
      return this.transaction.rollback(new Error('Roll back'))
    }
    return null
  }
}

export default Transaction
