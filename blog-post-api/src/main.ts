import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // swagger configuration
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Nest.js Masterclass -   Blog app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'mit.lisence.com')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build();

  // instantiate document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/swagger-ui', app, document);

  await app.listen(3000);
}

bootstrap();
