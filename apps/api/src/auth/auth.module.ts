import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { env } from '@/config/env'

import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: env.JWT_SECRET,
      }),
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
