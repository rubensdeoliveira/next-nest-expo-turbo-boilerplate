import { Module } from '@nestjs/common'

import { CreateTaskController } from '@/app/task/controllers'
import { CreateTaskUseCase } from '@/domain/task/use-cases'

import { DatabaseModule } from './common/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateTaskController],
  providers: [CreateTaskUseCase],
})
export class TaskModule {}
