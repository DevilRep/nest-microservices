import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { Message } from '../../db/entities/message';
import { MessageDto } from '../dto/messages';
import { RemoteMessageClientService } from './remote-message-client.service';

@Controller('remote-message-client')
export class RemoteMessageClientController {
    constructor(
        private readonly remoteMessageClientService: RemoteMessageClientService,
    ) {}

    @Get('/:id')
    public async findOne(@Param('id') id: number): Promise<Message> {
        try {
            return await this.remoteMessageClientService.findOne(id);
        } catch (error) {
            console.log('error details', error.details);
            if (error.details && error.details === 'not found') {
                console.log('t');
                throw new NotFoundException('Entity not found');
            }
            console.log('else');
            throw error;
        }
    }

    @Get()
    public async findAll(): Promise<Message[]> {
        try {
            return await this.remoteMessageClientService.findAll();
        } catch (error) {
            if (error.details && error.details === 'not found') {
                throw new NotFoundException('Entity not found');
            }
            throw error;
        }
    }

    @Post()
    public async create(@Body() data: MessageDto): Promise<Message> {
        try {
            return await this.remoteMessageClientService.create(data);
        } catch (error) {
            if (error.details && error.details === 'not found') {
                throw new NotFoundException('Entity not found');
            }
            throw error;
        }
    }

    @Put('/:id')
    public async update(
        @Param('id') id: number,
        @Body() data: MessageDto,
    ): Promise<Message> {
        try {
            return await this.remoteMessageClientService.update(id, data);
        } catch (error) {
            if (error.details && error.details === 'not found') {
                throw new NotFoundException('Entity not found');
            }
            throw error;
        }
    }

    @Delete('/:id')
    public async remove(@Param('id') id: number): Promise<Message> {
        try {
            return await this.remoteMessageClientService.remove(id);
        } catch (error) {
            if (error.details && error.details === 'not found') {
                throw new NotFoundException('Entity not found');
            }
            throw error;
        }
    }
}
