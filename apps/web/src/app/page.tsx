import { defineAbilityFor } from '@next-nest-react-native-turbo-boilerplate/auth'
import { getClientEnv } from '@next-nest-react-native-turbo-boilerplate/env'

export default function Home() {
  const ability = defineAbilityFor({ id: 'teste', role: 'MEMBER' })

  return <div>{JSON.stringify(getClientEnv())}</div>
}
