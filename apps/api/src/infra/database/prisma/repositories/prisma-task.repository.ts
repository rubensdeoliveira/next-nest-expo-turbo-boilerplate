import { Injectable } from '@nestjs/common'

import { TaskEntity } from '@/domain/task/entities'
import { TaskRepository } from '@/domain/task/repositories'

import { PrismaService } from '../prisma.service'
import { PrismaDefaultRepository } from './common'

@Injectable()
export class PrismaTaskRepository
  extends PrismaDefaultRepository<TaskEntity>
  implements TaskRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'task')
  }
}
