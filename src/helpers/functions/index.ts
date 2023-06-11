import numeral from 'numeral'
import { Blob } from 'buffer'
import FormData from 'form-data'
import { fileType } from '../../interface/type'

export const haddleErrorMessage = (error: any): Error => {
  if (typeof error === 'string') return new Error(error)
  if (typeof error === 'object') return error
  return new Error(JSON.stringify(error, null, 4))
}

export const objToformData = (
  ob: any,
  prefix = '',
  result: FormData = new FormData()
) => {
  prefix = prefix ? `${prefix}[` : ''
  // eslint-disable-next-line no-restricted-syntax
  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i) && ob[i] != null) {
      if (typeof ob[i] === 'object' && !('buffer' in ob[i]) && ob[i] != null) {
        objToformData(ob[i], `${prefix}${i}${prefix ? ']' : ''}`, result)
      } else {
        const key = prefix + i + (prefix ? ']' : '')
        if (
          typeof ob[i] === 'object' &&
          'mimetype' in ob[i] &&
          'buffer' in ob[i]
        ) {
          const { buffer, mimetype, filename } = ob[i] as fileType
          result.append(prefix.replace('[', ''), buffer, {
            filename,
          })
        } else result.append(key, ob[i])
      }
    }
  }
  return result
}
