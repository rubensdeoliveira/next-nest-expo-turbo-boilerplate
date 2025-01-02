import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { CreateSessionUseCase } from '@/domain/account/use-cases/create-session.use-case'

import {
  CreateSessionBodySchema,
  createSessionValidator,
} from '../validators/create-session.validator'

@Controller('/session')
export class CreateSessionController {
  constructor(private createSessionUseCase: CreateSessionUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body(createSessionValidator) data: CreateSessionBodySchema) {
    const session = await this.createSessionUseCase.execute(data)
    return session
  }
}
