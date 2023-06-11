import knex from 'knex'
import { debug } from '../config/debug'
import env from '../env'

if (!env.db) throw new Error('no databse config in .env')

export const Knex = knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: env.db.host,
    user: env.db.username,
    port: parseInt(env.db?.port || '0', 10),
    password: env.db.password,
    database: env.db.database,
  },
  pool: {
    min: 0,
    max: 10,
  },
})

export const connectToDB = async () => {
  try {
    await Knex.raw('select 1+1 as result')
    return debug(`====== CONNECT DATABASE SUCCESS ======`)
  } catch (error) {
    return debug(`====== CONNECT DATABASE FALIED ======`)
  }
}
