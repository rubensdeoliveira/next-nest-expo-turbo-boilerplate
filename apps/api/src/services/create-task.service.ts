import { Injectable } from '@nestjs/common'

import { CreateTaskBodySchema } from '@/controllers/create-task.controller'
import { PrismaService } from '@/prisma/prisma.service'

type CreateTaskServiceInput = CreateTaskBodySchema & {
  userId: string
}

type CreateTaskServiceOutput = {
  title: string
  description: string
}

@Injectable()
export class CreateTaskService {
  constructor(private prisma: PrismaService) {}

  async execute({
    userId,
    ...data
  }: CreateTaskServiceInput): Promise<CreateTaskServiceOutput> {
    const { title, description } = await this.prisma.task.create({
      data: {
        ...data,
        userId,
      },
    })

    return { title, description }
  }
}
