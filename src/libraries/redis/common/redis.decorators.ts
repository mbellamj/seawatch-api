import { Inject } from '@nestjs/common';
import { IRedis } from '../interfaces';
import { getRedisConnectionToken } from './redis.utils';

export const InjectRedisOld = (connection?: string) =>
  Inject(getRedisConnectionToken(connection));

export const InjectRedis: (connection?: IRedis) => ReturnType<typeof Inject> = (
  connection?: IRedis,
) => Inject(getRedisConnectionToken(connection));
