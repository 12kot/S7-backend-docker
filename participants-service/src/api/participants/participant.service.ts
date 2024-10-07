import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from './entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async get(eventId?: number) {
    return await this.participantRepository.find({
      where: {
        eventId: eventId,
      },
    });
  }

  async create(data: CreateParticipantDto) {
    return await this.participantRepository.save({
      ...data,
    });
  }

  async delete(username: string) {
    return await this.participantRepository.delete({ username });
  }
}
