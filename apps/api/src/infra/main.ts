import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { envVars } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = envVars.SERVER_PORT
  await app.listen(port)
}
bootstrap()
