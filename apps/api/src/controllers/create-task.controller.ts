import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser, CurrentUserType } from '@/auth/current-user.decorator'
import { JwtGuard } from '@/auth/jwt.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { CreateTaskService } from '@/services/create-task.service'

const createTaskBodySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>

@Controller('/tasks')
@UseGuards(JwtGuard)
export class CreateTaskController {
  constructor(private createTask: CreateTaskService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: CurrentUserType,
    @Body(new ZodValidationPipe(createTaskBodySchema))
    data: CreateTaskBodySchema,
  ) {
    const task = await this.createTask.execute({ ...data, userId: user.id })
    return task
  }
}
