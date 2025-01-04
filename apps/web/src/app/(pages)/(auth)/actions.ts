'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { appCookies } from '@/app/constants/app-cookies.constant'
import { appRoutes } from '@/app/constants/app-routes.constant'
import { serverRoutes } from '@/app/constants/server-routes.constants'
import { envVars } from '@/infra/config/env'

export async function SignInWithGoogle() {
  const googleSignInURL = new URL(
    `${serverRoutes.session}/google`,
    envVars.NEXT_PUBLIC_API_URL,
  )

  redirect(googleSignInURL.toString())
}

export async function SignOut() {
  const cookieStore = await cookies()
  cookieStore.delete(appCookies.ACCESS_TOKEN)
  cookieStore.delete(appCookies.REFRESH_TOKEN)

  redirect(appRoutes.signIn)
}
