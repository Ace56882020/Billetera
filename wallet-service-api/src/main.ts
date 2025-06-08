import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: '*', // En desarrollo puedes dejar '*', en producción usa el dominio específico
    methods: 'GET,POST,PUT,DELETE',
  });
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Billetera Virtual')
    .setDescription('Documentación de la API de la billetera virtual')
    .setVersion('1.0')
    .addTag('Billetera') // opcional
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 4001;
  await app.listen(port);
  console.log(`App listening on port ${port}`);
}
bootstrap();
