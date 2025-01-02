import { ConflictException, Injectable } from '@nestjs/common'

import { envVars } from '@/infra/config/env'

import { DateManipulatorGateway } from '../gateways/date-manipulator.gateway'
import { JwtGateway } from '../gateways/jwt.gateway'
import { AccountTokenRepository } from '../repositories/account-token.repository'

type RefreshSessionUseCaseRequest = { token: string }

type RefreshSessionUseCaseResponse = {
  accessToken: string
  refreshToken: string
}

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    private readonly accountTokenRepository: AccountTokenRepository,
    private readonly jwtGateway: JwtGateway,
    private readonly dateManipulatorGateway: DateManipulatorGateway,
  ) {}

  async execute(
    data: RefreshSessionUseCaseRequest,
  ): Promise<RefreshSessionUseCaseResponse> {
    const { token } = data
    const tokenExpiresIn = envVars.JWT_TOKEN_EXPIRES_IN
    const refreshTokenExpiresInDays = envVars.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS
    const refreshTokenExpiresIn = refreshTokenExpiresInDays + 'd'
    const { accountId } = this.jwtGateway.verify(token)
    const accountToken =
      await this.accountTokenRepository.findByAccountIdAndRefreshToken({
        accountId,
        refreshToken: token,
      })
    if (!accountToken) {
      throw new ConflictException('Refresh token does not exists')
    }
    await this.accountTokenRepository.delete(accountToken.id)
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
    return { refreshToken, accessToken }
  }
}
