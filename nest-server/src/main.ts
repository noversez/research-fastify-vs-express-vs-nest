import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });

  await app.listen(3003);
  console.log('🚀 NestJS server running on http://localhost:3003');
}

bootstrap();
