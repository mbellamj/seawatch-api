import { Inject } from '@nestjs/common';
import { IRedis } from '../interfaces';
import { getRedisConnectionToken } from './redis.utils';

export const InjectRedis: (connection?: IRedis) => ReturnType<typeof Inject> = (
  connection?: IRedis,
) => Inject(getRedisConnectionToken(connection));
