import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { env } from 'process'

import { CreateAccountController } from '@/app/account/controllers/create-account.controller'
import { CreateSessionController } from '@/app/account/controllers/create-session.controller'
import { GetAccountController } from '@/app/account/controllers/get-account.controller'
import { RefreshSessionController } from '@/app/account/controllers/refresh-session.controller'
import { JwtStrategy } from '@/app/account/strategies/jwt.strategy'
import { CreateAccountUseCase } from '@/domain/account/use-cases/create-account.use-case'
import { CreateSessionUseCase } from '@/domain/account/use-cases/create-session.use-case'
import { GetAccountUseCase } from '@/domain/account/use-cases/get-account.use-case'
import { RefreshSessionUseCase } from '@/domain/account/use-cases/refresh-session.use-case'

import { DatabaseModule } from './common/database.module'
import { GatewayModule } from './common/gateway.module'

@Module({
  imports: [
    DatabaseModule,
    GatewayModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [
    GetAccountController,
    CreateAccountController,
    CreateSessionController,
    RefreshSessionController,
  ],
  providers: [
    JwtStrategy,
    GetAccountUseCase,
    CreateAccountUseCase,
    CreateSessionUseCase,
    RefreshSessionUseCase,
  ],
})
export class AccountModule {}
