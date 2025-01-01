import { DefaultRepository } from '@/domain/common/repositories/default.repository'

import { AccountEntity } from '../entities/account.entity'

export abstract class AccountRepository extends DefaultRepository<AccountEntity> {
  abstract findByEmail(email: string): Promise<AccountEntity | null>
}
