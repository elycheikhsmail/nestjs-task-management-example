import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('boostrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const port = 3000;
  await app.listen(port);
  logger.log(`application listing on port : ${port}`);
}
bootstrap();
