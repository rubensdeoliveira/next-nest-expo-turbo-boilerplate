import { DefaultRepository } from '@/domain/common/repositories'
import { TaskEntity } from '@/domain/task/entities'

export abstract class TaskRepository extends DefaultRepository<TaskEntity> {}
