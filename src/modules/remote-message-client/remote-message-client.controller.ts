import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Message} from '../../db/entities/message';
import {MessageDto} from '../dto/messages';
import {RemoteMessageClientService} from './remote-message-client.service';

@Controller('remote-message-client')
export class RemoteMessageClientController {
    constructor(private readonly remoteMessageClientService: RemoteMessageClientService) {}

    @Get('/:id')
    public findOne(@Param('id') id: number): Promise<Message> {
        return this.remoteMessageClientService.findOne(id)
    }

    @Get()
    public findAll(): Promise<Message[]> {
        return this.remoteMessageClientService.findAll()
    }

    @Post()
    public create(@Body() data: MessageDto): Promise<Message> {
        return this.remoteMessageClientService.create(data)
    }

    @Put('/:id')
    public update(@Param('id') id: number, @Body() data: MessageDto): Promise<Message> {
        return this.remoteMessageClientService.update(id, data)
    }

    @Delete('/:id')
    public remove(id: number): Promise<Message> {
        return this.remoteMessageClientService.remove(id)
    }
}
