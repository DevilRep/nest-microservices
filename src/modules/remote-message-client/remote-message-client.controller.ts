import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseFilters,
} from '@nestjs/common';

import { Message } from '../../db/entities/message';
import { RpcExceptionFilter } from '../../rpc-exception.filter';
import { MessageDto } from '../dto/messages';
import { RemoteMessageClientService } from './remote-message-client.service';

@Controller('remote-message-client')
export class RemoteMessageClientController {
    constructor(
        private readonly remoteMessageClientService: RemoteMessageClientService,
    ) {}

    @Get('/:id')
    @UseFilters(RpcExceptionFilter)
    public findOne(@Param('id') id: number): Promise<Message> {
        return this.remoteMessageClientService.findOne(id);
    }

    @Get()
    @UseFilters(RpcExceptionFilter)
    public findAll(): Promise<Message[]> {
        return this.remoteMessageClientService.findAll();
    }

    @Post()
    @UseFilters(RpcExceptionFilter)
    public create(@Body() data: MessageDto): Promise<Message> {
        return this.remoteMessageClientService.create(data);
    }

    @Put('/:id')
    @UseFilters(RpcExceptionFilter)
    public update(
        @Param('id') id: number,
        @Body() data: MessageDto,
    ): Promise<Message> {
        return this.remoteMessageClientService.update(id, data);
    }

    @Delete('/:id')
    @UseFilters(RpcExceptionFilter)
    public remove(@Param('id') id: number): Promise<Message> {
        return this.remoteMessageClientService.remove(id);
    }
}
