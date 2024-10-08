import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

//1 в 1 как и auth-service
@ApiTags('event')
@Controller('event')
//весь класс защищён гуардом. То есть без токена ты попасть не сможешь
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  //Подключаем для кеширования всех ответов от этого эндпоинта
  @UseInterceptors(CacheInterceptor)
  //под этим ключом кэш будет сохраняться
  @CacheKey('events')
  //параметры, которые могут быть переданы в запросе. localhost:5000/event?date=value&type=value
  @ApiQuery({ name: 'date', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, type: String })
  get(@Query('date') date?: string, @Query('type') type?: string) {
    return this.eventService.get(date, type);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.eventService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateEventDto) {
    return this.eventService.create(data);
  }

  @Put(':id')
  async edit(@Param('id') id: number, @Body() data: CreateEventDto) {
    return this.eventService.edit(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.eventService.delete(Number(id));
  }
}
