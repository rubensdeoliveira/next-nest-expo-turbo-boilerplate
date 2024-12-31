import { AccountEntity } from '@/domain/account/entities'
import { DefaultRepository } from '@/domain/common/repositories'

export abstract class AccountRepository extends DefaultRepository<AccountEntity> {
  abstract findByEmail(email: string): Promise<AccountEntity | null>
}
