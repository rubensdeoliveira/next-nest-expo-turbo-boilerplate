import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import {
  appCookies,
  secureCookieOptions,
} from '@/app/common/constants/app-cookies.constant'
import { CreateSessionWithGoogleMobileUseCase } from '@/domain/account/use-cases/create-session-with-google-mobile.use-case'
import { envVars } from '@/infra/config/env'

import { GoogleGuard } from '../guards/google.guard'
import {
  CreateSessionWithGoogleMobileBodySchema,
  createSessionWithGoogleMobileValidator,
} from '../validators/create-session-with-google-mobile.validator'

@Controller('/session')
export class CreateSessionWithGoogleController {
  constructor(
    private createSessionWithGoogleMobileUseCase: CreateSessionWithGoogleMobileUseCase,
  ) {}

  @Get('/google')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    const { refreshToken, accessToken } = req.user

    res.cookie(appCookies.REFRESH_TOKEN, refreshToken, secureCookieOptions)
    res.cookie(appCookies.ACCESS_TOKEN, accessToken, secureCookieOptions)

    const redirectUrl = envVars.WEB_APP_URL
    return res.redirect(302, redirectUrl)
  }

  @Get('/google/mobile')
  async googleAuthMobile(
    @Body(createSessionWithGoogleMobileValidator)
    data: CreateSessionWithGoogleMobileBodySchema,
  ) {
    const session =
      await this.createSessionWithGoogleMobileUseCase.execute(data)
    return session
  }
}
