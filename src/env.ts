require('../config_env')

const getOsEnv = (key: string) => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`)
  }
  return process.env[key]
}

const env = {
  appName: getOsEnv('APP_NAME'),
  name: getOsEnv('APP_NAME'),
  node: getOsEnv('NODE_ENV'),
  port: getOsEnv('EXPRESS_PORT'),
  sign: getOsEnv('SIGN'),
  db: {
    host: getOsEnv('HOST_DATABASE'),
    port: getOsEnv('PORT_DATABASE'),
    username: getOsEnv('USERNAME_DATABASE'),
    password: getOsEnv('PASSWORD_DATABASE'),
    database: getOsEnv('NAME_DATABASE'),
  },
  prefix: getOsEnv('PATH_PREFIX'),
}

export default env
