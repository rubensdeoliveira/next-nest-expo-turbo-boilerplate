import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'

import { CurrentAccount, CurrentAccountType } from '@/app/account/decorators'
import { JwtGuard } from '@/app/account/guards'
import {
  CreateTaskBodySchema,
  createTaskValidator,
} from '@/app/task/validators'
import { CreateTaskUseCase } from '@/domain/task/use-cases'

@Controller('/tasks')
@UseGuards(JwtGuard)
export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Body(createTaskValidator) data: CreateTaskBodySchema,
  ) {
    const task = await this.createTaskUseCase.execute({
      ...data,
      accountId: account.id,
    })
    return task
  }
}
