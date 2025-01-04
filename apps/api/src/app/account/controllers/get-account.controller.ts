import { Controller, Get, UseGuards } from '@nestjs/common'

import { GetAccountUseCase } from '@/domain/account/use-cases/get-account.use-case'

import {
  CurrentAccount,
  CurrentAccountType,
} from '../decorators/current-account.decorator'
import { JwtGuard } from '../guards/jwt.guard'

@Controller('/account')
@UseGuards(JwtGuard)
export class GetAccountController {
  constructor(private readonly getAccountUseCase: GetAccountUseCase) {}

  @Get('/me')
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const getAccount = await this.getAccountUseCase.execute({
      accountId,
    })
    return getAccount
  }
}
