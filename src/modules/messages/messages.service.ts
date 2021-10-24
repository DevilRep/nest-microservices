import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Message} from '../../db/entities/message';
import {MessageDto} from '../dto/messages';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {}

    public findAll(): Promise<Message[]> {
        return this.messageRepository.find()
    }

    public findOne(id: number): Promise<Message> {
        return this.messageRepository.findOneOrFail(id)
    }

    public async remove(id: number): Promise<void> {
        await this.messageRepository.delete(id)
    }

    public async update(id: number, data: MessageDto): Promise<void> {
        await this.messageRepository.update(id, data)
    }

    public async create(data: MessageDto): Promise<Message> {
        const result = await this.messageRepository.insert(data)
        return this.findOne(result.identifiers[0].id)
    }
}
