import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import {
  CreateAccountBodySchema,
  createAccountValidator,
} from '@/app/account/validators'
import { CreateAccountUseCase } from '@/domain/account/use-cases'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(createAccountValidator) data: CreateAccountBodySchema) {
    const account = await this.createAccountUseCase.execute(data)
    return account
  }
}
