import { Module } from '@nestjs/common';

import { MessagesModule } from '../messages/messages.module';
import { RemoteMessageServerController } from './remote-message-server.controller';

@Module({
  imports: [MessagesModule],
  controllers: [RemoteMessageServerController],
})
export class RemoteMessageServerModule {}
