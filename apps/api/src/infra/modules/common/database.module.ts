import { Module } from '@nestjs/common'

import { AccountRepository } from '@/domain/account/repositories/account.repository'
import { TaskRepository } from '@/domain/task/repositories/task.repository'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { PrismaAccountRepository } from '@/infra/database/prisma/repositories/prisma-account.repository'
import { PrismaTaskRepository } from '@/infra/database/prisma/repositories/prisma-task.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
  ],
  exports: [PrismaService, AccountRepository, TaskRepository],
})
export class DatabaseModule {}
