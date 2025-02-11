import { z } from 'zod'

import { ZodValidationPipe } from '@/app/common/pipes/zod-validation.pipe'

const createSessionWithGoogleMobileBodySchema = z.object({
  idToken: z.string().min(1),
})

export type CreateSessionWithGoogleMobileBodySchema = z.infer<
  typeof createSessionWithGoogleMobileBodySchema
>

export const createSessionWithGoogleMobileValidator = new ZodValidationPipe(
  createSessionWithGoogleMobileBodySchema,
)
