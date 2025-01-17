import { Module } from '@nestjs/common'

import { DateManipulatorGateway } from '@/domain/account/gateways/date-manipulator.gateway'
import { EncryptionGateway } from '@/domain/account/gateways/encryption.gateway'
import { JwtGateway } from '@/domain/account/gateways/jwt.gateway'
import { BcryptEncryptionGateway } from '@/infra/gateways/bcrypt-encryption.gateway'
import { DateFnsDateManipulatorGateway } from '@/infra/gateways/date-fns-date-manipulator.gateway'
import { NestJwtGateway } from '@/infra/gateways/nest-jwt.gateway'

import { DatabaseModule } from './database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: EncryptionGateway,
      useClass: BcryptEncryptionGateway,
    },
    {
      provide: JwtGateway,
      useClass: NestJwtGateway,
    },
    {
      provide: DateManipulatorGateway,
      useClass: DateFnsDateManipulatorGateway,
    },
  ],
  exports: [EncryptionGateway, JwtGateway, DateManipulatorGateway],
})
export class GatewayModule {}
