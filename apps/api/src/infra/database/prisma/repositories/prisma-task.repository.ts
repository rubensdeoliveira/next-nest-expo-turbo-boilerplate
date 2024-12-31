import { Injectable } from '@nestjs/common'

import { TaskEntity } from '@/domain/task/entities'
import { TaskRepository } from '@/domain/task/repositories'
import { PrismaService } from '@/infra/database/prisma/config'
import { PrismaDefaultRepository } from '@/infra/database/prisma/repositories/common'

@Injectable()
export class PrismaTaskRepository
  extends PrismaDefaultRepository<TaskEntity>
  implements TaskRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'task')
  }
}
