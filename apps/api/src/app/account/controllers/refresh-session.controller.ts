import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { RefreshSessionUseCase } from '@/domain/account/use-cases/refresh-session.use-case'

import {
  RefreshSessionBodySchema,
  refreshSessionValidator,
} from '../validators/refresh-session.validator'

@Controller('/session')
export class RefreshSessionController {
  constructor(private readonly refreshSessionUseCase: RefreshSessionUseCase) {}

  @Post('/refresh')
  @HttpCode(200)
  async handle(@Body(refreshSessionValidator) data: RefreshSessionBodySchema) {
    const session = await this.refreshSessionUseCase.execute(data)
    return session
  }
}
