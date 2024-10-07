import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async get(date?: string, type?: string) {
    return await this.eventRepository.find({
      where: {
        type,
        date,
      },
    });
  }

  async create(data: CreateEventDto) {
    return await this.eventRepository.save({
      ...data,
    });
  }

  async edit(id: number, data: CreateEventDto) {
    return await this.eventRepository.update(id, {
      ...data,
    });
  }

  async delete(id: number) {
    return await this.eventRepository.delete(id);
  }
}
