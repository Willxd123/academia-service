import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultadModule } from './modules/facultad/facultad.module';
import { CarreraModule } from './modules/carrera/carrera.module';
import { MateriaPlanModule } from './modules/materia-plan/materia-plan.module';
import { PlanEstudioModule } from './modules/plan-estudio/plan-estudio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuración de TypeORM con PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),

        // Configuración SSL para Render
        ssl:
          configService.get('DATABASE_SSL') === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : false,

        // Auto-descubrimiento de entidades
        autoLoadEntities: true,

        // ⚠️ IMPORTANTE: false porque no queremos que NestJS modifique la BD compartida
        synchronize: false,

        // Ver queries en desarrollo
        logging: false,
      }),
      inject: [ConfigService],
    }),
    PlanEstudioModule,
    MateriaPlanModule,
    FacultadModule,
    CarreraModule,
  ],
})
export class AppModule { }
