import { Controller } from '@nestjs/common';
import {GrpcMethod, MessagePattern, Payload} from '@nestjs/microservices';

import { MessageDto } from '../dto/messages';
import { MessagesService } from '../messages/messages.service';
import { Message } from '../../db/entities/message';
import {
    RemoteMessageServerInterface,
    RemoteMessageServerCreateDataInterface,
    RemoteMessageServerFilterByIdInterface,
    RemoteMessageServerUpdateDataInterface
} from './remote-message-server.interface';

@Controller('remote-message-server')
export class RemoteMessageServerController {
    constructor(private readonly messagesService: MessagesService) {
    }

    @GrpcMethod('RemoteMessageServerService')
    public findOne({ id }: RemoteMessageServerFilterByIdInterface): Promise<RemoteMessageServerInterface> {
        return this.messagesService.findOne(id)
    }

    public findAll(): Promise<Message[]> {
        return this.messagesService.findAll()
    }

    @GrpcMethod('RemoteMessageServerService')
    public create(data: RemoteMessageServerCreateDataInterface): Promise<Message> {
        return this.messagesService.create(data)
    }

    @GrpcMethod('RemoteMessageServerService')
    public async update(
        {id, ...data}: RemoteMessageServerUpdateDataInterface
    ): Promise<Message> {
        if (!id) {
            throw new Error('Not Found')
        }
        await this.messagesService.update(id, data)
        return this.messagesService.findOne(id)
    }

    @GrpcMethod('RemoteMessageServerService')
    public async remove({ id }: RemoteMessageServerFilterByIdInterface) : Promise<Message> {
        const message: Message = await this.messagesService.findOne(id)
        await this.messagesService.remove(id)
        return message
    }
}
