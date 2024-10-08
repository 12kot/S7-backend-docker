import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
const cors = require('cors');

async function bootstrap(): Promise<void> {
  //создаём наше приложение
  const app = await NestFactory.create(AppModule);

  //это мидлвеер с корсами. Про корсы в интернете почитаете, если надо
  app.use(
    cors({
      origin: `*`,
      methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
      credentials: true,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  //это свагер. Можно спокойно удалить
  //доступен по адресу http:localhost:5000/api
  const config = new DocumentBuilder()
    .setTitle('Recruit task manager API')
    .setDescription('Recruit task manager API description')
    .setVersion('1.0')
    //ниже настройка - полная фигня - можно смело вырезать
    .addBearerAuth(
      {
        description: 'Please enter token in following format: Bearer <JWT>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .addBearerAuth(
      {
        description: 'Please enter token in following format: Bearer <JWT>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'refresh-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //на каком порту и адресе запускаемся
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
