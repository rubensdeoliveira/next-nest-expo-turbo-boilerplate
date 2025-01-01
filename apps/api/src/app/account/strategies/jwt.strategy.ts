import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'

import { envVars } from '@/infra/config/env'

const accountPayload = z.object({
  sub: z.string(),
})

export type AccountPayload = z.infer<typeof accountPayload>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envVars.JWT_SECRET,
    })
  }

  async validate(payload: AccountPayload) {
    return accountPayload.parse(payload)
  }
}
