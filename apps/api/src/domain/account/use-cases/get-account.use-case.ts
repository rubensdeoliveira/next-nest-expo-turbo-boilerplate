import { Injectable, NotFoundException } from '@nestjs/common'

import { AccountEntity } from '../entities/account.entity'
import { AccountRepository } from '../repositories/account.repository'

type GetAccountUseCaseRequest = { accountId: string }

type GetAccountUseCaseResponse = Omit<AccountEntity, 'password'>

@Injectable()
export class GetAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    data: GetAccountUseCaseRequest,
  ): Promise<GetAccountUseCaseResponse> {
    const { accountId } = data
    const account = await this.accountRepository.findById(accountId)
    if (!account) {
      throw new NotFoundException('Account does not exists')
    }
    const { email, id, name } = account
    return { email, id, name }
  }
}
