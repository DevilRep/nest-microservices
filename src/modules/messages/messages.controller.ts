import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Message} from '../../db/entities/message';
import {MessageDto} from '../dto/messages';
import {MessagesService} from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}

    @Get('/:id')
    public find(@Param('id') id: number): Promise<Message> {
        return this.messageService.findOne(id)
    }

    @Get()
    public findAll(): Promise<Message[]> {
        return this.messageService.findAll()
    }

    @Delete('/:id')
    public async remove(@Param('id') id: number): Promise<Message> {
        const message: Message = await this.messageService.findOne(id)
        await this.messageService.remove(id)
        return message
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() data: MessageDto): Promise<Message> {
       await this.messageService.update(id, data)
       return this.messageService.findOne(id)
    }

    @Post()
    public create(@Body() data: MessageDto): Promise<Message> {
        return this.messageService.create(data)
    }
}
