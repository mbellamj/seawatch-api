import Redis, { RedisOptions } from 'ioredis';

type RedisType = Redis | RedisOptions | string;

export type IRedis = RedisType & { name?: string };
