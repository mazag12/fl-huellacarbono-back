import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  //TODO: Ingreso de la variable API en la url
  app.setGlobalPrefix('huellacarbono');

  //TODO: Ingreso de Cors, simples para autenticación
  app.enableCors();

  //TODO: Validación de los Pipes
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

  await app.listen(3000);
}
bootstrap();
