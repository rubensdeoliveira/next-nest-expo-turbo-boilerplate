import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AccountEntity } from '../entities/account.entity'
import { EncryptionGateway } from '../gateways/encryption.gateway'
import { JwtGateway } from '../gateways/jwt.gateway'
import { AccountRepository } from '../repositories/account.repository'

type CreateSessionUseCaseRequest = {
  email: string
  password: string
}

type CreateSessionUseCaseResponse = {
  account: Omit<AccountEntity, 'password'>
  accessToken: string
  refreshToken: string
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
    if (!account || !account.password) {
      throw new UnauthorizedException('Email/password does not matches')
    }

    const passwordIsMatched = await this.encryptionGateway.validateHash({
      hashedValue: account.password,
      value: password,
    })
    if (!passwordIsMatched) {
      throw new UnauthorizedException('Email/password does not matches')
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
      })

    const { id, name } = account

    return {
      account: { email, id, name },
      accessToken,
      refreshToken,
    }
  }
}
