import { z } from 'zod'

export const taskSchema = z.object({
  __typename: z.literal('Task').default('Task'),
  id: z.string(),
  ownerId: z.string(),
})

export type Task = z.infer<typeof taskSchema>
