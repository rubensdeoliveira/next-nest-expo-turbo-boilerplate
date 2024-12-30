import { Injectable } from '@nestjs/common'
import { defineAbilityFor } from '@next-nest-expo-turbo-boilerplate/auth'
import env from '@next-nest-expo-turbo-boilerplate/env'

@Injectable()
export class AppService {
  getHello(): string {
    console.log('hello')
    console.log(env)
    const ability = defineAbilityFor({ id: 'teste', role: 'MEMBER' })
    console.log(ability)

    return ability ? 'hello' : 'ability'
  }
}
