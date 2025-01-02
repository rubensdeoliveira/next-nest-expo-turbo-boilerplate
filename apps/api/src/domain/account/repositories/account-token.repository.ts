import { DefaultRepository } from '@/domain/common/repositories/default.repository'

import { AccountTokenEntity } from '../entities/account-token.entity'

export type FindByAccountIdAndRefreshTokenParams = {
  accountId: string
  refreshToken: string
}

export abstract class AccountTokenRepository extends DefaultRepository<AccountTokenEntity> {
  abstract findByAccountIdAndRefreshToken(
    params: FindByAccountIdAndRefreshTokenParams,
  ): Promise<AccountTokenEntity | null>
}
