import { PostArg, GetArg } from '../interface/argument'
import { objToformData } from './functions'

const fetch = require('node-fetch')

export const postMethod = <t>({
  path,
  body = {},
  params = {},
  headers = {},
  isJSON = true,
}: PostArg) =>
  new Promise<t>((resolve, reject) => {
    const param = Object.entries(params)
      .reduce((result: string[], [key, value]) => {
        result.push(`${key}=${value}`)
        return result
      }, [])
      .join('&')
    const urlPath = [path, param].filter((e) => e).join('?')
    const info = {
      method: 'POST',
      body: isJSON ? JSON.stringify(body) : body,
      headers: {
        Authorization: 'server-side',
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    fetch(urlPath, info)
      .then(async (res: any) => {
        const json = await res.json()
        return res.ok
          ? resolve(json)
          : reject(new Error(JSON.stringify(json, null, 4)))
      })
      .catch((err: any) => reject(err))
  })

export const getMethod = <t>({ path, params = {}, headers = {} }: GetArg) =>
  new Promise<t>((resolve, reject) => {
    const param = Object.entries(params)
      .reduce((result: string[], [key, value]) => {
        result.push(`${key}=${value}`)
        return result
      }, [])
      .join('&')
    const urlPath = [path, param].filter((e) => e).join('?')
    const info = {
      method: 'GET',
      headers: {
        Authorization: 'server-side',
        'Content-Type': 'application/json',
        ...headers,
      },
    }
    fetch(urlPath, info)
      .then(async (res: any) => {
        const json = await res.json()
        return res.ok
          ? resolve(json)
          : reject(new Error(JSON.stringify(json, null, 4)))
      })
      .catch((err: any) => reject(err))
  })

export const postMethodDownload = ({
  path,
  body = {},
  params = {},
  headers = {},
}: PostArg) =>
  new Promise<Buffer>((resolve, reject) => {
    const param = Object.entries(params)
      .reduce((result: string[], [key, value]) => {
        result.push(`${key}=${value}`)
        return result
      }, [])
      .join('&')
    const urlPath = [path, param].filter((e) => e).join('?')
    const info = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: 'server-side',
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    fetch(urlPath, info)
      .then(async (res: any) => {
        const buffer = await res.buffer()
        return res.ok ? resolve(buffer) : reject(new Error('no buffer'))
      })
      .catch((err: any) => reject(err))
  })

export const postUploadMethod = <t>({
  path,
  body = {},
  params = {},
  headers = {},
}: PostArg) =>
  new Promise<any>((resolve, reject) => {
    const param = Object.entries(params)
      .reduce((result: string[], [key, value]) => {
        result.push(`${key}=${value}`)
        return result
      }, [])
      .join('&')
    const formdata = objToformData(body)
    const urlPath = [path, param].filter((e) => e).join('?')
    const info = {
      method: 'POST',
      body: formdata,
      headers: {
        Authorization: 'server-side',
        // 'Content-Type': `multipart/form-data; boundary=${formdata.getBoundary()}`,
        ...headers,
      },
    }
    fetch(urlPath, info)
      .then(async (res: any) => {
        const json = await res.json()
        return res.ok
          ? resolve(json)
          : reject(new Error(JSON.stringify(json, null, 4)))
      })
      .catch((err: any) => reject(err))
  })
