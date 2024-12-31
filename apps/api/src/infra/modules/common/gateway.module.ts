import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { EncryptionGateway, JwtGateway } from '@/domain/account/gateways'
import { BcryptEncryptionGateway, NestJwtGateway } from '@/infra/gateways'

@Module({
  providers: [
    JwtService,
    {
      provide: EncryptionGateway,
      useClass: BcryptEncryptionGateway,
    },
    {
      provide: JwtGateway,
      useClass: NestJwtGateway,
    },
  ],
  exports: [JwtService, EncryptionGateway, JwtGateway],
})
export class GatewayModule {}
