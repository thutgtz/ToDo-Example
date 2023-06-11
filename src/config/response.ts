import { ResponseArg } from '../interface/argument'

export const success = ({
  res,
  message = 'สำเร็จ',
  result = {},
  code = 200,
}: ResponseArg) => res.status(code).json({ success: true, message, result })

export const failed = ({
  res,
  message = 'ไม่สำเร็จ',
  error,
  code,
}: ResponseArg) =>
  res.status(code || 400).json({
    success: false,
    message,
    result: {},
    error: error?.stack?.toString(),
  })
