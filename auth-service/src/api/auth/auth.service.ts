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
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.get(username);
    if (!user) throw new BadRequestException('User not found');

    const passwordIsMatch = await argon2.verify(user?.password, pass);

    if (user && passwordIsMatch) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login({ username }: RegistrationDto) {
    return {
      token: this.jwtService.sign({
        username: username,
      }),
    };
  }

  async registration(registrationDto: RegistrationDto) {
    const { username } = registrationDto;

    const user = await this.userService.get(username);
    if (user)
      throw new BadRequestException('User with this username already exists');

    return await this.userService.create({
      ...registrationDto,
    });
  }

  async get(username: string) {
    return await this.userService.get(username);
  }
}
