import { Module } from '@nestjs/common'

import { AccountRepository } from '@/domain/account/repositories'
import { TaskRepository } from '@/domain/task/repositories'
import {
  PrismaAccountRepository,
  PrismaService,
  PrismaTaskRepository,
} from '@/infra/database'

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
