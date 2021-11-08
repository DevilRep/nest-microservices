import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
      AppModule,
      {
          transport: Transport.TCP,
          options: {
              host: process.env.MICROSERVICE_SERVER_HOST,
              port: Number(process.env.MICROSERVICE_SERVER_PORT)
          }
      }
  );
  await app.listen();
}
bootstrap();
