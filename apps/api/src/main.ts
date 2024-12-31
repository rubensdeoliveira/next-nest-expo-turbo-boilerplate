import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { env } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = env.SERVER_PORT
  await app.listen(port)
}
bootstrap()
