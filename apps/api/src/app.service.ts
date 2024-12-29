import { Injectable } from '@nestjs/common'
import { defineAbilityFor } from '@next-nest-react-native-turbo-boilerplate/auth'

@Injectable()
export class AppService {
  getHello(): string {
    console.log('hello')
    const ability = defineAbilityFor({ id: 'teste', role: 'MEMBER' })
    console.log(ability)

    return ability ? 'hello' : 'ability'
  }
}
