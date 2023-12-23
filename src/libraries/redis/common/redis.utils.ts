import { Type } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';
import { IRedis, IRedisModuleOptions } from '../interfaces';
import {
  DEFAULT_REDIS_CONNECTION_NAME,
  REDIS_MODULE_CONNECTION,
  REDIS_MODULE_OPTIONS_TOKEN,
} from '../redis.constants';

export function getRedisConnectionToken(
  connection: IRedis = DEFAULT_REDIS_CONNECTION_NAME,
): string | Type<Redis> {
  return DEFAULT_REDIS_CONNECTION_NAME === connection
    ? Redis
    : typeof connection === 'string'
      ? `${connection}Redis`
      : DEFAULT_REDIS_CONNECTION_NAME === connection.name || !connection.name
        ? Redis
        : `${connection.name}Redis`;
}

export function getRedisConnectionName(options: RedisOptions): string {
  return options && options.connectionName
    ? options.connectionName
    : DEFAULT_REDIS_CONNECTION_NAME;
}

export function getRedisOptionsToken(connection?: string): string {
  return `${
    connection || REDIS_MODULE_CONNECTION
  }_${REDIS_MODULE_OPTIONS_TOKEN}`;
}

export function createRedisConfig(options: IRedisModuleOptions): string {
  let url: string;
  if (options.ssl) {
    url = `rediss://${options.username}:${options.password}@${options.host}:${options.port}`;
  } else {
    url = `redis://${options.username}:${options.password}@${options.host}:${options.port}`;
  }

  return url;
}
