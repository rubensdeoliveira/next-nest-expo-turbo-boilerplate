import { Module } from '@nestjs/common'

import { AccountModule } from './modules/account.module'
import { TaskModule } from './modules/task.module'

@Module({
  imports: [AccountModule, TaskModule],
})
export class AppModule {}
