import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {join} from 'path';

import { RemoteMessageClientController } from './remote-message-client.controller';
import { RemoteMessageClientService } from './remote-message-client.service';

@Module({
    imports: [

    ],
    controllers: [RemoteMessageClientController],
    providers: [RemoteMessageClientService]
})
export class RemoteMessageClientModule {}
