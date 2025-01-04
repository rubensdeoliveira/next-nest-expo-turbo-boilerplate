import { deleteCookie } from 'cookies-next'

import { appCookies } from '../constants/app-cookies.constant'
import { appRoutes } from '../constants/app-routes.constant'

export function deleteAuthCookies() {
  deleteCookie(appCookies.ACCESS_TOKEN)
  deleteCookie(appCookies.REFRESH_TOKEN)
  window.location.href = appRoutes.signIn
}
