import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import {
  CreateSessionBodySchema,
  createSessionValidator,
} from '@/app/account/validators'
import { CreateSessionUseCase } from '@/domain/account/use-cases'

@Controller('/sessions')
export class CreateSessionController {
  constructor(private createSessionUseCase: CreateSessionUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body(createSessionValidator) data: CreateSessionBodySchema) {
    const session = await this.createSessionUseCase.execute(data)
    return session
  }
}
