import { Controller } from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {MessageDto} from '../dto/messages';

import {MessagesService} from '../messages/messages.service';
import {Message} from '../../db/entities/message';

@Controller('remote-message-server')
export class RemoteMessageServerController {
    constructor(private readonly messagesService: MessagesService) {}

    @MessagePattern('message:findOne')
    public find(id: number): Promise<Message> {
        return this.messagesService.findOne(id)
    }

    @MessagePattern('message:findAll')
    public findAll(): Promise<Message[]> {
        return this.messagesService.findAll()
    }

    @MessagePattern('message:create')
    public create(data: MessageDto): Promise<Message> {
        return this.messagesService.create(data)
    }

    @MessagePattern('message:update')
    public async update(
        @Payload('id') id: number,
        @Payload('data') data: MessageDto
    ): Promise<Message> {
        await this.messagesService.update(id, data)
        return this.messagesService.findOne(id)
    }

    @MessagePattern('message:remove')
    public async remove(id: number) : Promise<Message> {
        const message: Message = await this.messagesService.findOne(id)
        await this.messagesService.remove(id)
        return message
    }
}
