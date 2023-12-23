import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as Redis from 'ioredis';
import { InjectRedis } from './common/redis.decorators';
import { getRedisConnectionToken } from './common/redis.utils';
import { IRedis } from './interfaces';
import { RedisModule } from './redis.module';

describe('RedisModule', () => {
  it('Instance Redis', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          config: {
            host: '127.0.0.1',
            port: 6379,
            password: '123456',
          },
        }),
      ],
    }).compile();

    const app = module.createNestApplication();
    await app.init();
    const redisModule = module.get(RedisModule);
    expect(redisModule).toBeInstanceOf(RedisModule);

    await app.close();
  });

  it('Instance Redis client provider', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          config: {
            name: '1',
            host: '127.0.0.1',
            port: 6379,
            password: '123456',
          },
        }),
      ],
    }).compile();

    const app = module.createNestApplication();
    await app.init();
    const redisClient = module.get(getRedisConnectionToken('1'));
    const redisClientTest = module.get(getRedisConnectionToken('test'));

    expect(redisClient).toBeInstanceOf(Redis);
    expect(redisClientTest).toBeInstanceOf(Redis);

    await app.close();
  });

  it('inject redis connection', async () => {
    @Injectable()
    class TestProvider {
      constructor(@InjectRedis() private readonly redis: IRedis) {}

      getClient() {
        return this.redis;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          config: {
            host: '127.0.0.1',
            port: 6379,
            password: '123456',
          },
        }),
      ],
      providers: [TestProvider],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    const provider = module.get(TestProvider);
    expect(provider.getClient()).toBeInstanceOf(Redis);

    await app.close();
  });
});
