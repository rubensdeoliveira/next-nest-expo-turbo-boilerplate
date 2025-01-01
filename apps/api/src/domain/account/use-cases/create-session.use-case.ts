import { Injectable, UnauthorizedException } from '@nestjs/common'

import { EncryptionGateway } from '../gateways/encryption.gateway'
import { JwtGateway } from '../gateways/jwt.gateway'
import { AccountRepository } from '../repositories/account.repository'

type CreateSessionUseCaseRequest = {
  email: string
  password: string
}

type CreateSessionUseCaseResponse = {
  access_token: string
}

@Injectable()
export class CreateSessionUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private encryptionGateway: EncryptionGateway,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: CreateSessionUseCaseRequest,
  ): Promise<CreateSessionUseCaseResponse> {
    const { email, password } = data

    const account = await this.accountRepository.findByEmail(email)
    if (!account) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isValidPassword = await this.encryptionGateway.validateHash({
      value: password,
      hashedValue: account.password,
    })
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const access_token = this.jwtGateway.sign(account.id)

    return {
      access_token,
    }
  }
}
