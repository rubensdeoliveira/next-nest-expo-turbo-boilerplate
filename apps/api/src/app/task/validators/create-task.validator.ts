import { z } from 'zod'

import { ZodValidationPipe } from '@/app/common/pipes'

const createTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
})

export type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>

export const createTaskValidator = new ZodValidationPipe(createTaskBodySchema)
