import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { RemoteMessageClientController } from './remote-message-client.controller';
import { RemoteMessageClientService } from './remote-message-client.service';

@Module({
    imports: [
        ClientsModule.register([
            { name: 'MESSAGE_SERVICE', transport: Transport.TCP }
        ])
    ],
    controllers: [RemoteMessageClientController],
    providers: [RemoteMessageClientService]
})
export class RemoteMessageClientModule {}
