import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { failed, success } from '../../config/response'
import usersModel from './usersModel'
import Transaction from '../../knex/transaction'
import env from '../../env'
import { haddleErrorMessage } from '../../helpers/functions'

class UsersController {
  async register(req: Request, res: Response) {
    const transaction = new Transaction()
    try {
      await transaction.createTransaction()
      const { userName, password, email } = req.body

      await usersModel.createUser(
        {
          userName,
          password: await bcrypt.hash(password, 1),
          email,
        },
        transaction.transaction
      )
      await transaction.endTransaction()
      return success({
        res,
        message: 'register success.',
        result: {},
      })
    } catch (error) {
      await transaction.rollBackTransaction()
      return failed({
        res,
        message: 'register failed.',
        error: haddleErrorMessage(error),
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { password: inputPassword, email } = req.body

      const user = await usersModel.getUser({ email }).first()
      if (!user) throw new Error('email not found.')

      const { password, userId, userName } = user
      if (!bcrypt.compare(inputPassword, password))
        throw new Error('wrong password.')

      const accessToken = jsonwebtoken.sign(
        {
          userId,
          userName,
        },
        env.sign as string,
        { algorithm: 'HS256', expiresIn: '365d' }
      )

      return success({
        res,
        message: 'login success.',
        result: { accessToken },
      })
    } catch (error) {
      return failed({
        res,
        message: 'login failed.',
        error: haddleErrorMessage(error),
      })
    }
  }
}

export default new UsersController()
