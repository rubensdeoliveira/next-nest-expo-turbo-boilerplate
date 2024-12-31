import { Module } from '@nestjs/common'

import { EncryptionGateway, JwtGateway } from '@/domain/account/gateways'
import { BcryptEncryptionGateway, NestJwtGateway } from '@/infra/gateways'

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
