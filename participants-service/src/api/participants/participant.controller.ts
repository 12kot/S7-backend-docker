import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@ApiTags('participants')
@Controller('participants')
@UseGuards(JwtAuthGuard)
export class ParticipantController {
  constructor(private readonly eventService: ParticipantService) {}

  @Get()
  @ApiQuery({ name: 'eventId', required: false, type: Number })
  get(@Query('eventId') eventId?: number) {
    return this.eventService.get(eventId);
  }

  @Post()
  async create(@Body() data: CreateParticipantDto, @Request() req) {
    return this.eventService.create(data, req);
  }

  @Delete(':username')
  async delete(@Param('username') username: string) {
    return this.eventService.delete(username);
  }
}
