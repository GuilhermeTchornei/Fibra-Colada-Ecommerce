import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.enableCors();
  await app.listen(port, () => console.log(`Running in port ${port}`));
}
bootstrap();
