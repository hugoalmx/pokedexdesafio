import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  // Ativando a validação global da API
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Limpa qualquer dado extra/inútil enviado no JSON
    forbidNonWhitelisted: true, // Bloqueia a requisição se tiver campos não mapeados
  }));
  
  await app.listen(3001);
}
bootstrap();