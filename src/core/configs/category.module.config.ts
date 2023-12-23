import { IRedisModuleOptions } from '@libraries/redis/interfaces';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from '../entities';
import { ModuleConfig } from './module.config';

export const CATEGORY_CONFIG_TOKEN = 'category'.toUpperCase();

export function getCategoryDatabaseConfig(): TypeOrmModuleOptions {
  const module = new ModuleConfig(CATEGORY_CONFIG_TOKEN);

  let sslConfig = {};
  if (module.USE_SSL) {
    sslConfig = {
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }

  return {
    name: CATEGORY_CONFIG_TOKEN,
    type: 'postgres',
    database: module.DATABASE_NAME,
    host: module.DATABASE_HOST,
    port: module.DATABASE_PORT,
    username: module.DATABASE_USERNAME,
    password: module.DATABASE_PASSWORD,
    schema: 'public',
    connectTimeoutMS: 2000,
    autoLoadEntities: true,
    // logging: 'all',
    synchronize: true,
    migrationsRun: true,
    entities: [Category],
    ...sslConfig,
  };
}

export function getCategoryRedisConfig(): IRedisModuleOptions {
  const module = new ModuleConfig(CATEGORY_CONFIG_TOKEN);

  return {
    name: CATEGORY_CONFIG_TOKEN,
    ssl: module.USE_SSL,
    host: module.REDIS_HOST,
    port: module.REDIS_PORT,
    username: module.REDIS_USERNAME,
    password: module.REDIS_PASSWORD,
  };
}
