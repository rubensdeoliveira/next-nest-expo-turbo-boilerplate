import {
  getClientEnv,
  getServerEnv,
} from '@next-nest-expo-turbo-boilerplate/env'

const envVars = { ...getServerEnv(), ...getClientEnv() }

export { envVars }
