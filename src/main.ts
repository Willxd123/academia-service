import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Establecer un prefijo global para las rutas
  app.setGlobalPrefix('api');
  
  // Habilitar CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Usar pipes globales para la validación de datos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Grupos Service API')
    .setDescription('API para gestión de carreras, facultades, materia-plan y plan-estudio')
    .setVersion('1.0')
    .addTag('carreras')
    .addTag('facultades')
    .addTag('materia-plan')
    .addTag('plan-estudio')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Iniciar la aplicación
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Grupos Service running on port ${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/docs`);
  console.log(`🔗 API base URL: http://localhost:${port}/api`);
}

bootstrap();