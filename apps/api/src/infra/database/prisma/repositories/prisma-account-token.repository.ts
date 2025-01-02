import { Injectable } from '@nestjs/common'

import { AccountTokenEntity } from '@/domain/account/entities/account-token.entity'
import {
  AccountTokenRepository,
  FindByAccountIdAndRefreshTokenParams,
} from '@/domain/account/repositories/account-token.repository'

import { PrismaService } from '../config/prisma.service'
import { PrismaDefaultRepository } from './common/prisma-default.repository'

@Injectable()
export class PrismaAccountTokenRepository
  extends PrismaDefaultRepository<AccountTokenEntity>
  implements AccountTokenRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'accountToken')
  }

  async findByAccountIdAndRefreshToken(
    params: FindByAccountIdAndRefreshTokenParams,
  ): Promise<AccountTokenEntity | null> {
    const { refreshToken, accountId } = params
    const token = await this.prisma.accountToken.findFirst({
      where: { refreshToken, accountId },
    })
    return token
  }
}
