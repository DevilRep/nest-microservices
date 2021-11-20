import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { EntityNotFoundError } from 'typeorm';

import { MessagesService } from '../messages/messages.service';
import { Message } from '../../db/entities/message';
import {
    RemoteMessageServerInterface,
    RemoteMessageServerCreateDataInterface,
    RemoteMessageServerFilterByIdInterface,
    RemoteMessageServerUpdateDataInterface,
    RemoteMessageServerCollectionInterface,
} from './remote-message-server.interface';

@Controller('remote-message-server')
export class RemoteMessageServerController {
    constructor(private readonly messagesService: MessagesService) {}

    @GrpcMethod('RemoteMessageService')
    public async findOne({
        id,
    }: RemoteMessageServerFilterByIdInterface): Promise<RemoteMessageServerInterface> {
        try {
            return await this.messagesService.findOne(id);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new RpcException({
                    message: 'not found',
                });
            }
            throw error;
        }
    }

    @GrpcMethod('RemoteMessageService')
    public async findAll(): Promise<RemoteMessageServerCollectionInterface> {
        return {
            items: await this.messagesService.findAll(),
        };
    }

    @GrpcMethod('RemoteMessageService')
    public create(
        data: RemoteMessageServerCreateDataInterface,
    ): Promise<Message> {
        return this.messagesService.create(data);
    }

    @GrpcMethod('RemoteMessageService')
    public async update({
        id,
        ...data
    }: RemoteMessageServerUpdateDataInterface): Promise<Message> {
        try {
            if (!id) {
                throw new RpcException({
                    message: 'not found',
                });
            }
            await this.messagesService.update(id, data);
            return this.findOne({ id });
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new RpcException({
                    message: 'not found',
                });
            }
            throw error;
        }
    }

    @GrpcMethod('RemoteMessageService')
    public async delete({
        id,
    }: RemoteMessageServerFilterByIdInterface): Promise<Message> {
        try {
            if (!id) {
                throw new RpcException({
                    message: 'not found',
                });
            }
            const message: Message = await this.messagesService.findOne(id);
            await this.messagesService.remove(id);
            return message;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new RpcException({
                    message: 'not found',
                });
            }
            throw error;
        }
    }
}
