import { ModuleConfig } from '@interfaces/module.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from './database-service/category.entity';
import { MODULE_NAME } from './name';
import { IRedisModuleOptions } from '@libraries/redis/interfaces';

export function getCategoryDatabaseConfig(): TypeOrmModuleOptions {
  const module = new ModuleConfig(MODULE_NAME);

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
    name: MODULE_NAME,
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
  const module = new ModuleConfig(MODULE_NAME);

  return {
    name: MODULE_NAME,
    ssl: module.USE_SSL,
    host: module.REDIS_HOST,
    port: module.REDIS_PORT,
    username: module.REDIS_USERNAME,
    password: module.REDIS_PASSWORD,
  };
}
