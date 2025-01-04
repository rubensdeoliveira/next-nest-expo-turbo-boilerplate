import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  appCookies,
  secureCookieOptions,
} from '@/app/common/constants/app-cookies.constant'
import { envVars } from '@/infra/config/env'

import { GoogleGuard } from '../guards/google.guard'

@Controller('/session')
export class CreateSessionWithGoogleController {
  @Get('/google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    const { refreshToken, accessToken } = req.user

    res.cookie(appCookies.REFRESH_TOKEN, refreshToken, secureCookieOptions)
    res.cookie(appCookies.ACCESS_TOKEN, accessToken, secureCookieOptions)

    const redirectUrl = envVars.CLIENT_APP_URL
    return res.redirect(302, redirectUrl)
  }
}
