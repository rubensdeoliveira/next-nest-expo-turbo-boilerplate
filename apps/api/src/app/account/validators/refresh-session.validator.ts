import { z } from 'zod'

import { ZodValidationPipe } from '@/app/common/pipes/zod-validation.pipe'

const refreshSessionBodySchema = z.object({
  token: z.string().min(1),
})

export type RefreshSessionBodySchema = z.infer<typeof refreshSessionBodySchema>

export const refreshSessionValidator = new ZodValidationPipe(
  refreshSessionBodySchema,
)
