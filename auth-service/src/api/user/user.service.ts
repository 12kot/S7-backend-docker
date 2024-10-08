import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';

//юзер сервис. Тут находится наша логика юзера
@Injectable()
export class UserService {
  constructor(
    //создаём репу для взаимодействия с бд юзера
    @InjectRepository(User)
    private userRepository: Repository<User>,
    //создаём сервис для авторизации
    private readonly jwtService: JwtService,
  ) {}

  async get(username: string) {
    //функция получения юзера по Username
    //userRepository - это репозиторий, который работает с помощью typeorm
    //userRepository.* - это всё встроенное в ORM Для взаимодействия с бд, чтобы не писать запросы руками
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async create({ username, password }: CreateUserDto) {
    //создание нового юзера
    const user = await this.userRepository.save({
      password: await argon2.hash(password),
      username: username,
    });

    //получаем сразу токен по данным юзера и после отдаём на фронт
    const token = this.jwtService.sign({ username, password });

    return { user, token };
  }
}
