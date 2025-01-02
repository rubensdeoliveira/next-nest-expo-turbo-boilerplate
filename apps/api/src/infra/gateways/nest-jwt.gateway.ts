import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import {
  JwtGateway,
  JwtPayload,
  JwtSignParams,
} from '@/domain/account/gateways/jwt.gateway'

@Injectable()
export class NestJwtGateway implements JwtGateway {
  constructor(private jwt: JwtService) {}

  sign({ expiresIn, payload }: JwtSignParams): string {
    const token = this.jwt.sign(
      {
        sub: JSON.stringify(payload),
      },
      {
        expiresIn,
      },
    )
    return token
  }

  verify(token: string): JwtPayload {
    const payload = this.jwt.verify(token)
    return JSON.parse(payload.sub)
  }
}
