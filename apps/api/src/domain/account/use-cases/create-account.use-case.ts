import { ConflictException, Injectable } from '@nestjs/common'

import { AccountEntity } from '@/domain/account/entities'
import { EncryptionGateway } from '@/domain/account/gateways'
import { AccountRepository } from '@/domain/account/repositories'

type CreateAccountUseCaseRequest = {
  email: string
  name: string
  password: string
}

type CreateAccountUseCaseResponse = Omit<AccountEntity, 'password'>

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private encryptionGateway: EncryptionGateway,
  ) {}

  async execute(
    data: CreateAccountUseCaseRequest,
  ): Promise<CreateAccountUseCaseResponse> {
    const accountWithSameEmail = await this.accountRepository.findByEmail(
      data.email,
    )
    if (accountWithSameEmail) {
      throw new ConflictException('Account with same email already exists')
    }

    const hashedPassword = await this.encryptionGateway.createHash(
      data.password,
    )

    const { email, name, id } = await this.accountRepository.create({
      ...data,
      password: hashedPassword,
    })

    return {
      email,
      name,
      id,
    }
  }
}
