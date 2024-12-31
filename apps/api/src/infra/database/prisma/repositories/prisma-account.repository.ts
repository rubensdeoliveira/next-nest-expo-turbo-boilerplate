import { Injectable } from '@nestjs/common'

import { AccountEntity } from '@/domain/account/entities'
import { AccountRepository } from '@/domain/account/repositories'

import { PrismaService } from '../prisma.service'
import { PrismaDefaultRepository } from './common/prisma-default.repository'

@Injectable()
export class PrismaAccountRepository
  extends PrismaDefaultRepository<AccountEntity>
  implements AccountRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'account')
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      return null
    }

    return account
  }
}
