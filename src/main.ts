import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // origin: '*',
    origin: 'http://localhost:3000',
  });
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();