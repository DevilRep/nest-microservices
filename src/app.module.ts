import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Message } from './db/entities/message';
import { MessagesModule } from './modules/messages/messages.module';
import { RemoteMessageServerModule } from './modules/remote-message-server/remote-message-server.module';
import { RemoteMessageClientModule } from './modules/remote-message-client/remote-message-client.module';

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
      MessagesModule,
      RemoteMessageServerModule,
      RemoteMessageClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
