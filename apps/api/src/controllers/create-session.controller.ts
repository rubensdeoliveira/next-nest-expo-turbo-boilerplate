import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { CreateSessionService } from '@/services/create-session.service'

const createSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateSessionBodySchema = z.infer<typeof createSessionBodySchema>

@Controller('/sessions')
export class CreateSessionController {
  constructor(private createSession: CreateSessionService) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(createSessionBodySchema))
    data: CreateSessionBodySchema,
  ) {
    const session = await this.createSession.execute(data)
    return session
  }
}
