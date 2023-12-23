import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Redis, RedisOptions } from 'ioredis';

export type IRedisModuleOptions = {
  ssl?: boolean;
} & Partial<RedisOptions>;

export interface IRedisModuleOptionsFactory {
  createRedisModuleOptions(
    connectionName?: string,
  ): Promise<IRedisModuleOptions> | IRedisModuleOptions;
}

export type IRedisOptionsFactory = (options?: RedisOptions) => Promise<Redis>;

export interface IRedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  inject?: any[];
  useClass?: Type<IRedisModuleOptionsFactory>;
  useExisting?: Type<IRedisModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<IRedisModuleOptions> | IRedisModuleOptions;
  redisOptionsFactory?: IRedisOptionsFactory;
}
