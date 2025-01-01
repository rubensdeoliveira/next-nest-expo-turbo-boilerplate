import { Module } from '@nestjs/common'

import { CreateTaskController } from '@/app/task/controllers/create-task.controller'
import { CreateTaskUseCase } from '@/domain/task/use-cases/create-task.use-case'

import { DatabaseModule } from './common/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateTaskController],
  providers: [CreateTaskUseCase],
})
export class TaskModule {}
