import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'

import { AppModule } from './app.module';

async function bootstrap() {
    if (process.env.IS_MICROSERVICE && process.env.IS_MICROSERVICE !== 'true') {
        const app = await NestFactory.create(AppModule);
        await app.listen(process.env.MICROSERVICE_SERVER_PORT);
        return
    }
    const app = await NestFactory.createMicroservice(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: 'remote-message',
                protoPath: join(__dirname, 'modules/remote-message/remote-message.proto')
            }
        }
    );
    await app.listen();
}
bootstrap();
