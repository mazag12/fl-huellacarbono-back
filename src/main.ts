import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { AllExceptionFilter } from './common/filters/http-exceptions.filter';
import { HttpInterceptor } from './common/interceptors/http.interceptor';

async function bootstrap() {
  const lg = new Logger('HuellaCarbono');
  
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'error'] });
  const { PORT, APP_NAME, DOCS_URI, DOCS_TITLE, DOCS_DESCRIPTION, DOCS_VERSION, DOCS_SERVER, } = process.env;

  app.enableCors({ origin: '*' });
  app
    .setGlobalPrefix('api')
    .enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
    .useGlobalInterceptors(new TimeOutInterceptor())
    .useGlobalFilters(new AllExceptionFilter())
    .useGlobalInterceptors(new HttpInterceptor())
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

  const config = new DocumentBuilder()
    .setTitle(DOCS_TITLE)
    .setDescription(DOCS_DESCRIPTION)
    .setVersion(DOCS_VERSION)
    .addServer(DOCS_SERVER)
    .addBearerAuth()
    .addBasicAuth()
    .build();
  SwaggerModule.setup(DOCS_URI, app, SwaggerModule.createDocument(app, config));
  app.listen(PORT, async () =>
    lg.debug(`${APP_NAME} ${await app.getUrl()}${DOCS_URI}`),
  );
}
bootstrap();
