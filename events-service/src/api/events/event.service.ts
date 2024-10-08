import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
//1 в 1 как и auth-service
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  //"?" значит, что параметр необязателен
  async get(date?: string, type?: string) {
    //вернёт массив ивентов по фильтрам
    return await this.eventRepository.find({
      where: {
        type,
        date,
      },
    });
  }

  async getById(id: number) {
    //1 в 1 как и auth-service
    return await this.eventRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(data: CreateEventDto) {
    //1 в 1 как и auth-service
    return await this.eventRepository.save({
      ...data,
    });
  }

  async edit(id: number, data: CreateEventDto) {
    //1 в 1 как и auth-service. Обновление строки по id
    return await this.eventRepository.update(id, {
      ...data,
    });
  }

  async delete(id: number) {
    //1 в 1 как и auth-service. Удаление строки по id
    return await this.eventRepository.delete(id);
  }
}
