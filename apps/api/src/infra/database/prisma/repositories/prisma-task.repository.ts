import { Injectable } from '@nestjs/common'

import { TaskEntity } from '@/domain/task/entities/task.entity'
import { TaskRepository } from '@/domain/task/repositories/task.repository'

import { PrismaService } from '../config/prisma.service'
import { PrismaDefaultRepository } from './common/prisma-default.repository'

@Injectable()
export class PrismaTaskRepository
  extends PrismaDefaultRepository<TaskEntity>
  implements TaskRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'task')
  }
}
