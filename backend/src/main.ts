import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './contexts/shared/config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    skipNullProperties: true,
    forbidUnknownValues: true
  }))
  app.enableCors({ origin: "*" })
  await app.listen(PORT);
}
bootstrap();
