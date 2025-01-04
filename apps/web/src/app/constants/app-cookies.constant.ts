import { envVars } from '@/infra/config/env'

export const appCookies = {
  REFRESH_TOKEN: `${envVars.API_APP_NAME}_refresh_token`,
  ACCESS_TOKEN: `${envVars.API_APP_NAME}_access_token`,
}
