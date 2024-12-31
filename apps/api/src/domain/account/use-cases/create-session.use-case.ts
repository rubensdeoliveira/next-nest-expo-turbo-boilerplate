import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { AccountRepository } from '@/domain/account/repositories'

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
    private jwt: JwtService,
  ) {}

  async execute(
    data: CreateSessionUseCaseRequest,
  ): Promise<CreateSessionUseCaseResponse> {
    const { email, password } = data

    const account = await this.accountRepository.findByEmail(email)
    if (!account) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isValidPassword = await compare(password, account.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const access_token = this.jwt.sign({
      sub: account.id,
    })

    return {
      access_token,
    }
  }
}
