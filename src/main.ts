import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
    if (process.env.IS_MICROSERVICE && process.env.IS_MICROSERVICE === 'true') {
        const app = await NestFactory.create(AppModule);
        await app.listen(process.env.MICROSERVICE_SERVER_PORT);
        return
    }
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
