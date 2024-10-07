import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['**/*.entity.ts'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['**/migrations/*.ts'],
  migrationsTableName: 'history',
  ssl:
    process.env.ENVIRONMENT === 'PRODUCTION'
      ? { rejectUnauthorized: false }
      : false,
});
