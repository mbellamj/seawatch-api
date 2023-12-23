import { ModuleConfig } from '@interfaces/module.config';
import { IRedisModuleOptions } from '@libraries/redis/interfaces';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { MODULE_NAME } from './name';

export function getGenreDatabaseConfig(): TypeOrmModuleOptions {
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
    type: 'mysql',
    database: module.DATABASE_NAME,
    host: module.DATABASE_HOST,
    port: module.DATABASE_PORT,
    username: module.DATABASE_USERNAME,
    password: module.DATABASE_PASSWORD,
    autoLoadEntities: true,
    // logging: 'all',
    synchronize: true,
    migrationsRun: true,
    entities: [Genre],
    ...sslConfig,
  };
}

export function getGenreRedisConfig(): IRedisModuleOptions {
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
