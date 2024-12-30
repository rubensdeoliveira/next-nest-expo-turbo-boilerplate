import { NestFactory } from '@nestjs/core'
import { getServerEnv } from '@next-nest-react-native-turbo-boilerplate/env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(getServerEnv().SERVER_PORT)
}
bootstrap()
