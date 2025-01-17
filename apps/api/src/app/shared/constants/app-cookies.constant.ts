import { envVars } from '@/infra/config/env'

import { convertDaysInMiliSeconds } from '../utils/convert-days-in-seconds.util'

export const appCookies = {
  REFRESH_TOKEN: `${envVars.API_APP_NAME}_refresh_token`,
  ACCESS_TOKEN: `${envVars.API_APP_NAME}_access_token`,
}

export const secureCookieOptions = {
  httpOnly: true,
  secure: envVars.ENV === 'production',
  // sameSite: 'None',
  maxAge: convertDaysInMiliSeconds(envVars.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS),
  path: '/',
}
