import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as process from 'process';

config();

//файл настройки бд. Мы используем postgres
export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'db', //берём название из docker-compose
  port: 5432, //стандартный порт для бд
  username: 'postgres', //креды
  password: 'postgres', //креды
  database: 'b_db_auth', //название бд, к которой подключаемся
  entities: ['**/*.entity.ts'], //пути к сущностям
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['**/migrations/*.ts'], //пути к миграциям
  migrationsTableName: 'history',
  ssl:
    process.env.ENVIRONMENT === 'PRODUCTION'
      ? { rejectUnauthorized: false }
      : false,
});
