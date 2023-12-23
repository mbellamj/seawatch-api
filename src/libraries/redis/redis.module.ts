import { DynamicModule, Module } from '@nestjs/common';
import { IRedisModuleAsyncOptions, IRedisModuleOptions } from './interfaces';
import { RedisCoreModule } from './redis.core-module';

@Module({})
export class RedisModule {
  public static forRoot(options: IRedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: IRedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options)],
    };
  }
}
