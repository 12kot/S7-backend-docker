import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as process from 'process';

config();

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'b_db_auth',
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
