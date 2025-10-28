import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { DatabaseModule } from './database/database.module';
import { FormasPagoModule } from './formas-pago/formas-pago.module';

/**
 * Módulo raíz de la aplicación
 * Importa todos los módulos funcionales de la aplicación
 *
 * ConfigModule: Maneja las variables de entorno (.env)
 * DatabaseModule: Proporciona la conexión a PostgreSQL (Global)
 * SampleModule: Módulo de ejemplo con endpoints CRUD in-memory
 * FormasPagoModule: Módulo para obtener formas de pago desde PostgreSQL
 */
@Module({
  imports: [
    // ConfigModule para cargar variables de entorno desde .env
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible en toda la app
      envFilePath: '.env', // Ruta al archivo .env
    }),
    DatabaseModule, // Módulo de conexión a PostgreSQL (Global)
    SampleModule, // Módulo de ejemplo con operaciones CRUD
    FormasPagoModule, // Módulo de formas de pago desde BD
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
