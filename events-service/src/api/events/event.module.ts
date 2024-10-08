import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';

//1 в 1 как и auth-service
@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '120d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
