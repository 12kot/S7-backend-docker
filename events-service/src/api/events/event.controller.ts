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
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('event')
@Controller('event')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
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
