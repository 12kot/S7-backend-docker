import { BadRequestException, Injectable, Req } from '@nestjs/common';
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

  async create({ eventId, username }: CreateParticipantDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];

    const event = await fetch(`${process.env.EVENTS_URL}/event/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const eventRes = await event.json();
      if (!eventRes) throw new BadRequestException('Event not found');
    } catch {
      throw new BadRequestException('Event not found');
    }

    const user = await fetch(`${process.env.USERS_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const userRes = await user.json();
      if (!userRes) throw new BadRequestException('User not found');
    } catch {
      throw new BadRequestException('User not found');
    }

    return await this.participantRepository.save({
      eventId,
      username,
    });
  }

  async delete(username: string) {
    return await this.participantRepository.delete({ username });
  }
}
