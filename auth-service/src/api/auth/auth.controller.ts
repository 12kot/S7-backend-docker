import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegistrationDto } from './dto/registration.dto';

//для свагера. название раздела
@ApiTags('auth')
//общий путь для этого сервиса localhost:5000/что в ковычках ниже/...
@Controller('auth')
export class AuthController {
  //создаём наш сервис
  constructor(private readonly authService: AuthService) {}

  //эндрпоинт на пост localhost:5000/auth/login
  @Post('login')
  //локальный гуард. Он и авторизовывает
  @UseGuards(LocalAuthGuard)
  //это то, что мы ожидаем получить из запроса
  async login(@Body() registrationDto: RegistrationDto) {
    //вызываем функцию авторизаци из сервиса
    return this.authService.login(registrationDto);
  }

  @Post('register')
  async registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @Get('profile')
  //этот гуард проверяет токен на валидность
  @UseGuards(JwtAuthGuard)
  //в итоге мы получем по, что хранится в payload токена
  getProfile(@Request() req) {
    //возвращаем наружу этот payload
    return req.user;
  }
}
