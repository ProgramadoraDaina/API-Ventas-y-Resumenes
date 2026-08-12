import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);/*levanta el servidor en el puerto 3000*/
}
bootstrap();/*Ejecuta la función que inicia la aplicación*/
