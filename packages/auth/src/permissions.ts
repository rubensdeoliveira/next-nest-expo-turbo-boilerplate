import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_, { can }) => {
    can('manage', 'all')
  },
  MEMBER: (user, { can }) => {
    can(['create', 'get'], 'Task')
    can(['update', 'delete'], 'Task', { ownerId: { $eq: user.id } })
  },
}
