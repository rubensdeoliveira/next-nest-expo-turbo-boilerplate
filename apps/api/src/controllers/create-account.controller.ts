import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { CreateAccountService } from '@/services/create-account.service'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: CreateAccountService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createAccountBodySchema))
    data: CreateAccountBodySchema,
  ) {
    const account = await this.createAccount.execute(data)
    return account
  }
}
