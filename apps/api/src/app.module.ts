import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateSessionController } from './controllers/create-session.controller'
import { CreateTaskController } from './controllers/create-task.controller'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountService } from './services/create-account.service'
import { CreateSessionService } from './services/create-session.service'
import { CreateTaskService } from './services/create-task.service'

@Module({
  imports: [AuthModule],
  controllers: [
    CreateAccountController,
    CreateSessionController,
    CreateTaskController,
  ],
  providers: [
    PrismaService,
    CreateSessionService,
    CreateAccountService,
    CreateTaskService,
  ],
})
export class AppModule {}
