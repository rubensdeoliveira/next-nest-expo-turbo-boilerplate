import { Module } from '@nestjs/common'

import { AccountModule, TaskModule } from '@/infra/modules'

@Module({
  imports: [AccountModule, TaskModule],
})
export class AppModule {}
