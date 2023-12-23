import { ModuleConfig } from './module.config';
import { IRedisModuleOptions } from '@libraries/redis/interfaces';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const MOVIE_CONFIG_TOKEN = 'movie'.toUpperCase();

export function getMovieDatabaseConfig(): TypeOrmModuleOptions {
  const module = new ModuleConfig(MOVIE_CONFIG_TOKEN);

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
    name: MOVIE_CONFIG_TOKEN,
    type: 'mongodb',
    // database: module.DATABASE_NAME,
    host: module.DATABASE_HOST,
    port: module.DATABASE_PORT,
    username: module.DATABASE_USERNAME,
    password: module.DATABASE_PASSWORD,
    autoLoadEntities: true,
    logging: 'all',
    synchronize: true,
    migrationsRun: true,
    ...sslConfig,
  };
}

export function getMovieRedisConfig(): IRedisModuleOptions {
  const module = new ModuleConfig(MOVIE_CONFIG_TOKEN);
  return {
    name: MOVIE_CONFIG_TOKEN,
    ssl: module.USE_SSL,
    host: module.REDIS_HOST,
    port: module.REDIS_PORT,
    username: module.REDIS_USERNAME,
    password: module.REDIS_PASSWORD,
  };
}
