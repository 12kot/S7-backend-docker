import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async get(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async create({ username, password }: CreateUserDto) {
    const user = await this.userRepository.save({
      password: await argon2.hash(password),
      username: username,
    });

    const token = this.jwtService.sign({ username, password });

    return { user, token };
  }
}
