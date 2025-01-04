import { AxiosError } from 'axios'
import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { appCookies } from './app/constants/app-cookies.constant'
import { appPublicRoutes, appRoutes } from './app/constants/app-routes.constant'
import { serverRoutes } from './app/constants/server-routes.constants'
import { envVars } from './infra/config/env'
import { api } from './infra/libs/axios'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const atualPath = req.nextUrl.pathname

  const refreshToken = req.cookies.get(appCookies.REFRESH_TOKEN)?.value
  const accessToken = req.cookies.get(appCookies.ACCESS_TOKEN)?.value

  const userIsAuthenticated = accessToken && refreshToken

  const isPublicRoute = appPublicRoutes.includes(atualPath)
  const isPrivateRoute = !isPublicRoute

  if (userIsAuthenticated) {
    try {
      await jwtVerify(accessToken, new TextEncoder().encode(envVars.JWT_SECRET))
    } catch {
      try {
        const response = await api.post(`${serverRoutes.session}/refresh`, {
          token: refreshToken,
        })

        res.cookies.set(appCookies.ACCESS_TOKEN, response.data.accessToken)
        res.cookies.set(appCookies.REFRESH_TOKEN, response.data.refreshToken)
        return res
      } catch (err) {
        const error = err as AxiosError
        if (error?.response?.status === 401) {
          res.cookies.delete(appCookies.ACCESS_TOKEN)
          res.cookies.delete(appCookies.REFRESH_TOKEN)
          return res
        }
      }
    }
  }

  if (isPublicRoute && userIsAuthenticated) {
    return NextResponse.redirect(new URL(appRoutes.dashboard, req.url))
  }

  if (isPrivateRoute && !userIsAuthenticated) {
    return NextResponse.redirect(new URL(appRoutes.signIn, req.url))
  }
}

export const config = {
  matcher: '/:path*',
}
