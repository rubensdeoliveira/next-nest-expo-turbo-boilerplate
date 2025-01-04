import { Injectable } from '@nestjs/common'

import { AccountEntity } from '../entities/account.entity'
import { JwtGateway } from '../gateways/jwt.gateway'
import { AccountRepository } from '../repositories/account.repository'

type CreateSessionWithGoogleUseCaseRequest = {
  email: string
  name: string
}

export type CreateSessionWithGoogleUseCaseResponse = {
  account: Omit<AccountEntity, 'password'>
  accessToken: string
  refreshToken: string
}

@Injectable()
export class CreateSessionWithGoogleUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: CreateSessionWithGoogleUseCaseRequest,
  ): Promise<CreateSessionWithGoogleUseCaseResponse> {
    const { email, name } = data

    let account = await this.accountRepository.findByEmail(email)
    if (!account) {
      account = await this.accountRepository.create({
        email,
        name,
        password: null,
      })
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
      })

    const { id } = account

    return {
      account: { email, id, name },
      accessToken,
      refreshToken,
    }
  }
}
