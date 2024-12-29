import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
// import { env } from '@next-nest-react-native-turbo-boilerplate/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3333)
}
bootstrap()
