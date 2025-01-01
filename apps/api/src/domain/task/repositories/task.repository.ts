import { DefaultRepository } from '@/domain/common/repositories/default.repository'

import { TaskEntity } from '../entities/task.entity'

export abstract class TaskRepository extends DefaultRepository<TaskEntity> {}
