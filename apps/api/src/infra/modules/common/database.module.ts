import { Module } from '@nestjs/common'

import { AccountRepository } from '@/domain/account/repositories'
import { TaskRepository } from '@/domain/task/repositories'
import { PrismaService } from '@/infra/database/prisma/config'
import {
  PrismaAccountRepository,
  PrismaTaskRepository,
} from '@/infra/database/prisma/repositories'

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
