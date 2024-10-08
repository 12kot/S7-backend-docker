import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

//модуль юзера
@Module({
  imports: [
    //это какие модели будут доступны в сервисе
    TypeOrmModule.forFeature([User]),
    //это настройки авторизации
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        //берём из env наш секретный ключ на основе которого токены генерятся
        secret: configService.get('JWT_SECRET'),
        //время жизни токена
        signOptions: { expiresIn: '120d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  //чтобы можно было использовать
  providers: [UserService],
  //что можно экспортить
  exports: [UserService],
})
export class UserModule {}
