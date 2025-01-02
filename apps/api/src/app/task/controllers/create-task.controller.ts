import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'

import {
  CurrentAccount,
  CurrentAccountType,
} from '@/app/account/decorators/current-account.decorator'
import { JwtGuard } from '@/app/account/guards/jwt.guard'
import { CreateTaskUseCase } from '@/domain/task/use-cases/create-task.use-case'

import {
  CreateTaskBodySchema,
  createTaskValidator,
} from '../validators/create-task.validator'

@Controller('/task')
@UseGuards(JwtGuard)
export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Body(createTaskValidator) data: CreateTaskBodySchema,
  ) {
    const { accountId } = account
    const task = await this.createTaskUseCase.execute({
      ...data,
      accountId,
    })
    return task
  }
}
