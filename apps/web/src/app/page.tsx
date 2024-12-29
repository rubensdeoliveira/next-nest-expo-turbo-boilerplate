import { defineAbilityFor } from '@next-nest-react-native-turbo-boilerplate/auth'

export default function Home() {
  const ability = defineAbilityFor({ id: 'teste', role: 'MEMBER' })

  return <div>{ability ? JSON.stringify(ability) : 'ability'}</div>
}
