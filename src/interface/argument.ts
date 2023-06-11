import { Request, Response } from 'express'

export interface ResponseArg {
  res: Response
  message: string
  result?: any
  error?: Error
  code?: 200 | 404
}

export interface GetArg {
  path: string
  params: Record<string, any>
  headers: Record<string, any>
}

export interface PostArg extends GetArg {
  body: any
  isJSON?: boolean
}
