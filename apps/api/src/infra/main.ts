import { NestFactory } from '@nestjs/core'

import { env } from '@/infra/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = env.SERVER_PORT
  await app.listen(port)
}
bootstrap()
