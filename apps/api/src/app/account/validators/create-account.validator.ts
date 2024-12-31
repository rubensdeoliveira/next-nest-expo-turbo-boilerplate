import { z } from 'zod'

import { ZodValidationPipe } from '@/app/common/pipes'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

export const createAccountValidator = new ZodValidationPipe(
  createAccountBodySchema,
)
