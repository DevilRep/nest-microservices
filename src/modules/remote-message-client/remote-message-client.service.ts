import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { Message } from '../../db/entities/message';
import { MessageDto } from '../dto/messages';
import { RemoteMessageClientServiceInterface } from './remote-message-client.interface';

@Injectable()
export class RemoteMessageClientService implements OnModuleInit {
    private remoteMessageService: RemoteMessageClientServiceInterface;

    constructor(
        @Inject('MESSAGE_SERVICE')
        private readonly remoteMessageClientClient: ClientGrpc,
    ) {}

    onModuleInit(): any {
        this.remoteMessageService =
            this.remoteMessageClientClient.getService<RemoteMessageClientServiceInterface>(
                'RemoteMessageService',
            );
    }

    public findOne(id: number): Promise<Message> {
        return lastValueFrom(this.remoteMessageService.findOne({ id }));
    }

    public findAll(): Promise<Message[]> {
        return lastValueFrom(this.remoteMessageService.findAll(null));
    }

    public create(data: MessageDto): Promise<Message> {
        return lastValueFrom(this.remoteMessageService.create(data));
    }

    public update(id: number, data: MessageDto): Promise<Message> {
        return lastValueFrom(this.remoteMessageService.update({ id, ...data }));
    }

    public remove(id: number): Promise<Message> {
        return lastValueFrom(this.remoteMessageService.delete({ id }));
    }
}
