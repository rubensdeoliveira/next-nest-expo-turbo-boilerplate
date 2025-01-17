import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

import { envVars } from '@/infra/config/env'

import { AccountEntity } from '../entities/account.entity'

type CreateSessionWithGoogleMobileUseCaseRequest = {
  idToken: string
}

export type CreateSessionWithGoogleMobileUseCaseResponse = {
  account: Omit<AccountEntity, 'password'>
  accessToken: string
  refreshToken: string
}

@Injectable()
export class CreateSessionWithGoogleMobileUseCase {
  private googleClientId = envVars.GOOGLE_CLIENT_ID
  private googleClient = new OAuth2Client(this.googleClientId)

  async execute(
    data: CreateSessionWithGoogleMobileUseCaseRequest,
  ): Promise<CreateSessionWithGoogleMobileUseCaseResponse> {
    const { idToken } = data

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.googleClientId,
      })

      const payload = ticket.getPayload()
      console.log(payload)
      return {
        accessToken: '',
        refreshToken: '',
        account: {
          email: '',
          id: '',
          name: '',
        },
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid Google Token')
    }
  }
}
