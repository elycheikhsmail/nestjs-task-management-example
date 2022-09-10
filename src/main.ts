import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TasksModule } from './tasks/tasks.module';
//
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('boostrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = 3000;

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const catDocument = SwaggerModule.createDocument(
    app,
    options,
    //   {
    //   include: [TasksModule],
    // }
  );
  SwaggerModule.setup('docs', app, catDocument);
  //SwaggerModule.setup('api', app );

  // const config = new DocumentBuilder()
  // .setTitle('Cats example')
  // .setDescription('The cats API description')
  // .setVersion('1.0')
  // .addTag('tasks')
  // .addTag('auth')
  // .addSecurity('basic', {
  //   type: 'http',
  //   scheme: 'bearer', // basic and bearer
  // })
  // .build();

  //const document = SwaggerModule.createDocument(app, config );
  //SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`application listing on port : ${port}`);
}
bootstrap();
