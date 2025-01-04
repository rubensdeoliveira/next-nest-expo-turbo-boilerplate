import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { z } from 'zod'

import {
  CreateSessionWithGoogleUseCase,
  CreateSessionWithGoogleUseCaseResponse,
} from '@/domain/account/use-cases/create-session-with-google.use-case'
import { envVars } from '@/infra/config/env'

const validationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

type GoogleProfile = {
  displayName: string
  emails: { value: string }[]
  photos: { value: string }[]
  name: { familyName: string; givenName: string }
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private createSessionWithGoogleUseCase: CreateSessionWithGoogleUseCase,
  ) {
    super({
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CLIENT_CALLBACK_URL,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    _: string,
    __: string,
    profile: GoogleProfile,
  ): Promise<Partial<CreateSessionWithGoogleUseCaseResponse>> {
    const data = {
      email: profile.emails[0].value,
      name: profile.displayName,
    }
    const result = validationSchema.safeParse(data)
    if (!result.success) {
      throw new BadRequestException('Invalid profile data from google')
    }
    const session = await this.createSessionWithGoogleUseCase.execute(
      result.data,
    )
    return session
  }
}
