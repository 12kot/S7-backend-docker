import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    //создаём сервис юзера для прямого взаимодействия с UserService
    private readonly userService: UserService,
    //создаём сервис авторизации. Втроенная штука
    private readonly jwtService: JwtService,
  ) {}

  //валидация юзера
  async validateUser(username: string, pass: string) {
    //достаём из базы
    const user = await this.userService.get(username);
    if (!user) throw new BadRequestException('User not found');

    //проверяем на совпадение паролей. Пароль в базе = хэш. Если хэши совпадут - всё ок
    const passwordIsMatch = await argon2.verify(user?.password, pass);

    //если всё ок - валидация успешна
    if (user && passwordIsMatch) {
      return user;
    }

    //иначе гуляем
    throw new UnauthorizedException('Invalid credentials');
  }

  //логин
  async login({ username }: RegistrationDto) {
    //вернёт токен
    return {
      token: this.jwtService.sign({
        username: username,
      }),
    };
  }

  //ругистрация
  async registration(registrationDto: RegistrationDto) {
    const { username } = registrationDto;

    //юзера из бд
    const user = await this.userService.get(username);
    if (user)
      throw new BadRequestException('User with this username already exists');

    //создаём
    return await this.userService.create({
      ...registrationDto,
    });
  }
}
