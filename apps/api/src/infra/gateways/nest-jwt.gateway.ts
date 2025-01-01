import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { JwtGateway } from '@/domain/account/gateways/jwt.gateway'

@Injectable()
export class NestJwtGateway implements JwtGateway {
  constructor(private jwt: JwtService) {}

  sign(sub: string): string {
    const token = this.jwt.sign({
      sub,
    })
    return token
  }
}
