import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Message } from './db/entities/message';
import { MessagesModule } from './modules/messages/messages.module';
import {RemoteMessageClientController} from './modules/remote-message-client/remote-message-client.controller';
import {RemoteMessageClientService} from './modules/remote-message-client/remote-message-client.service';
import { RemoteMessageServerModule } from './modules/remote-message-server/remote-message-server.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        entities: [Message]
      }),
      ClientsModule.register([{
          name: 'MESSAGE_SERVICE',
          transport: Transport.TCP,
          options: {
              host: process.env.MICROSERVICE_CLIENT_HOST,
              port: Number(process.env.MICROSERVICE_CLIENT_PORT)
          }
      }]),
      MessagesModule,
      RemoteMessageServerModule,
  ],
  controllers: [AppController, RemoteMessageClientController],
  providers: [AppService, RemoteMessageClientService],
})
export class AppModule {}
