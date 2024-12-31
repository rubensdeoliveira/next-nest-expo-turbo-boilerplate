import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import {
  CreateAccountController,
  CreateSessionController,
} from '@/app/account/controllers'
import { JwtStrategy } from '@/app/account/strategies'
import {
  CreateAccountUseCase,
  CreateSessionUseCase,
} from '@/domain/account/use-cases'
import { env } from '@/infra/config'

import { DatabaseModule } from './common/database.module'

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [CreateAccountController, CreateSessionController],
  providers: [JwtStrategy, CreateAccountUseCase, CreateSessionUseCase],
})
export class AccountModule {}
