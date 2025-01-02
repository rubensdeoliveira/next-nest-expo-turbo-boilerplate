import { Injectable, UnauthorizedException } from '@nestjs/common'

import { envVars } from '@/infra/config/env'

import { AccountEntity } from '../entities/account.entity'
import { DateManipulatorGateway } from '../gateways/date-manipulator.gateway'
import { EncryptionGateway } from '../gateways/encryption.gateway'
import { JwtGateway } from '../gateways/jwt.gateway'
import { AccountRepository } from '../repositories/account.repository'
import { AccountTokenRepository } from '../repositories/account-token.repository'

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
    private accountTokenRepository: AccountTokenRepository,
    private encryptionGateway: EncryptionGateway,
    private jwtGateway: JwtGateway,
    private dateManipulatorGateway: DateManipulatorGateway,
  ) {}

  async execute(
    data: CreateSessionUseCaseRequest,
  ): Promise<CreateSessionUseCaseResponse> {
    const { email, password } = data
    const tokenExpiresIn = envVars.JWT_TOKEN_EXPIRES_IN
    const refreshTokenExpiresInDays = envVars.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS
    const refreshTokenExpiresIn = refreshTokenExpiresInDays + 'd'
    const account = await this.accountRepository.findByEmail(email)
    if (!account) {
      throw new UnauthorizedException('Email/password does not matches')
    }
    const accountId = account.id
    const passwordIsMatched = await this.encryptionGateway.validateHash({
      hashedValue: account.password,
      value: password,
    })
    if (!passwordIsMatched) {
      throw new UnauthorizedException('Email/password does not matches')
    }
    const accessToken = this.jwtGateway.sign({
      payload: { accountId },
      expiresIn: tokenExpiresIn,
    })
    const refreshToken = this.jwtGateway.sign({
      payload: { accountId },
      expiresIn: refreshTokenExpiresIn,
    })
    const expiresDate = this.dateManipulatorGateway.addDays({
      date: new Date(),
      days: refreshTokenExpiresInDays,
    })
    await this.accountTokenRepository.create({
      expiresDate,
      refreshToken,
      accountId,
    })
    const { id, name } = account
    return {
      account: { email, id, name },
      accessToken,
      refreshToken,
    }
  }
}
