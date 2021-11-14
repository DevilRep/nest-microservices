import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { Message } from '../../db/entities/message';
import { MessageDto } from '../dto/messages';

@Injectable()
export class RemoteMessageClientService {
    constructor(@Inject('MESSAGE_SERVICE') private readonly remoteMessageClientClient: ClientProxy) {}

    public findOne(id: number): Promise<Message> {
        return firstValueFrom(this.remoteMessageClientClient.send<Message>('message:findOne', id))
    }

    public findAll(): Promise<Message[]> {
        return firstValueFrom(this.remoteMessageClientClient.send<Message[]>('message:findAll', ''))
    }

    public create(data: MessageDto): Promise<Message> {
        return firstValueFrom(this.remoteMessageClientClient.send<Message>('message:create', data))
    }

    public update(id: number, data: MessageDto): Promise<Message> {
        return firstValueFrom(this.remoteMessageClientClient.send<Message>('message:update', {
            id,
            data
        }))
    }

    public remove(id: number): Promise<Message> {
        return firstValueFrom(this.remoteMessageClientClient.send<Message>('message:remove', id))
    }
}
