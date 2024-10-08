import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

//1 в 1 как и auth-service
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'b_db_events', //своё название базы
        entities: [__dirname + '/../**/*.entity{.js,.ts}'],
        autoLoadEntities: true,
        ssl:
          configService.get('ENVIRONMENT') === 'PRODUCTION'
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
