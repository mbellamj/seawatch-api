import {
  DynamicModule,
  Global,
  Inject,
  Logger,
  Module,
  OnApplicationShutdown,
  Provider,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Redis, RedisOptions } from 'ioredis';
import {
  createRedisConfig,
  getRedisConnectionName,
  getRedisConnectionToken,
} from './common';
import {
  IRedisModuleAsyncOptions,
  IRedisModuleOptions,
  IRedisModuleOptionsFactory,
  IRedisOptionsFactory,
} from './interfaces';
import { REDIS_MODULE_OPTIONS_TOKEN } from './redis.constants';

@Global()
@Module({})
export class RedisCoreModule implements OnApplicationShutdown {
  private readonly logger = new Logger('RedisModule');

  constructor(
    @Inject(REDIS_MODULE_OPTIONS_TOKEN)
    private readonly options: IRedisModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  public static forRoot(options: IRedisModuleOptions = {}): DynamicModule {
    const redisModuleOptions: Provider = {
      provide: REDIS_MODULE_OPTIONS_TOKEN,
      useValue: options,
    };

    const redisConnectionProvider: Provider = {
      provide: getRedisConnectionToken(options as RedisOptions),
      useFactory: async () => await this.createRedisConnection(options),
    };

    return {
      module: RedisCoreModule,
      providers: [redisModuleOptions, redisConnectionProvider],
      exports: [redisModuleOptions, redisConnectionProvider],
    };
  }

  public static forRootAsync(options: IRedisModuleAsyncOptions): DynamicModule {
    const redisConnectionProvider: Provider = {
      provide: getRedisConnectionToken(options as RedisOptions),
      useFactory: async (redisOptions: IRedisModuleOptions) => {
        if (options.name) {
          return await this.createRedisConnection(
            {
              ...redisOptions,
              connectionName: options.name,
            },
            options.redisOptionsFactory,
          );
        }

        return await this.createRedisConnection(
          redisOptions,
          options.redisOptionsFactory,
        );
      },
      inject: [REDIS_MODULE_OPTIONS_TOKEN],
    };

    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: RedisCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, redisConnectionProvider],
      exports: [redisConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(
    options: IRedisModuleAsyncOptions,
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    if (options.useExisting || options.useFactory)
      return [this.createAsyncOptionsProvider(options)];

    return [
      this.createAsyncOptionsProvider(options),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(
    options: IRedisModuleAsyncOptions,
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    if (options.useFactory) {
      return {
        provide: REDIS_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: REDIS_MODULE_OPTIONS_TOKEN,
      async useFactory(
        optionsFactory: IRedisModuleOptionsFactory,
      ): Promise<IRedisModuleOptions> {
        return await optionsFactory.createRedisModuleOptions(options.name);
      },
      inject: [options.useClass || options.useExisting],
    };
  }

  onApplicationShutdown(signal?: string) {
    const redisConnection = this.moduleRef.get<Redis>(
      getRedisConnectionToken(this.options as RedisOptions) as Type<Redis>,
    );
    try {
      if (redisConnection) redisConnection.disconnect();
    } catch (error) {
      this.logger.error(error?.message);
    }
  }

  private static async createRedisConnection(
    options: IRedisModuleOptions,
    redisOptionsFactory?: IRedisOptionsFactory,
  ) {
    const redisConnectionName = getRedisConnectionName(options as RedisOptions);
    const createConnection =
      redisOptionsFactory ??
      ((redisOptions: RedisOptions) =>
        new Redis(createRedisConfig(redisOptions)));

    return await createConnection(options);
  }
}
