import { Module } from '@nestjs/common'

import { EncryptionGateway } from '@/domain/account/gateways/encryption.gateway'
import { JwtGateway } from '@/domain/account/gateways/jwt.gateway'
import { BcryptEncryptionGateway } from '@/infra/gateways/bcrypt-encryption.gateway'
import { NestJwtGateway } from '@/infra/gateways/nest-jwt.gateway'

@Module({
  providers: [
    {
      provide: EncryptionGateway,
      useClass: BcryptEncryptionGateway,
    },
    {
      provide: JwtGateway,
      useClass: NestJwtGateway,
    },
  ],
  exports: [EncryptionGateway, JwtGateway],
})
export class GatewayModule {}
