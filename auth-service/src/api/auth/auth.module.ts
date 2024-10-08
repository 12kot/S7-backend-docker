import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

//модуль авторизации
@Module({
  imports: [
    //что мы можем использовать в сервисе
    UserModule,
    PassportModule,
    //ещё раз конфигурация авторизации (подробнее в userModule)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '120d' },
      }),
      inject: [ConfigService],
    }),
  ],
  //наши контролеры, описываются наши эндпоинты
  controllers: [AuthController],
  //провайдеры, что мы можем использовать
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
