import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async search(username?: string) {
    if (!username) {
      return await this.usersRepository.find();
    }

    return await this.usersRepository.find({
      where: {
        username: Like(`%${username}%`),
      },
    });
  }

  async get(username?: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
