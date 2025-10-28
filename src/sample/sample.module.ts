import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';

/**
 * Módulo Sample
 * Encapsula toda la funcionalidad relacionada con samples
 * 
 * Este es un ejemplo de módulo básico de NestJS que incluye:
 * - Controller: maneja las peticiones HTTP
 * - Service: contiene la lógica de negocio
 * 
 * Para usar este módulo en otras partes de la aplicación,
 * debe ser importado en el AppModule o en otros módulos
 */
@Module({
  controllers: [SampleController], // Controladores del módulo
  providers: [SampleService], // Servicios y providers del módulo
  exports: [SampleService], // Exporta el servicio para que pueda ser usado en otros módulos
})
export class SampleModule {}

