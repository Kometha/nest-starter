import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Crear la aplicación NestJS con logger personalizado
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Niveles de log habilitados
  });

  // Logger global para usar en toda la aplicación
  const logger = new Logger('Bootstrap');

  // Configurar validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma los payloads a las instancias de DTO
      transformOptions: {
        enableImplicitConversion: true, // Convierte tipos automáticamente
      },
    }),
  );

  // Configuración de Swagger para documentación de la API
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter API')
    .setDescription(
      'Template de API REST con NestJS que incluye logger, validaciones y ejemplos CRUD',
    )
    .setVersion('1.0')
    .addTag('sample', 'Endpoints de ejemplo para operaciones CRUD')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger disponible en /api

  // Puerto de la aplicación
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // Log de inicio con información útil
  logger.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
  logger.log(`📚 Documentación Swagger en: http://localhost:${port}/api`);
}

void bootstrap();
