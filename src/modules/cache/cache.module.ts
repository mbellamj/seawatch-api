import { IModuleConfigService } from '@core/abstracts';
import { RedisModule } from '@libraries/redis';
import { DynamicModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [],
  providers: [CacheService],
})
export class CacheModule {
  /**
   * forRoot
   */
  public static forRoot(moduleService: IModuleConfigService): DynamicModule {
    return {
      module: CacheModule,
      imports: [
        RedisModule.forRoot(moduleService.category.getCacheConfig()),
        RedisModule.forRoot(moduleService.genre.getCacheConfig()),
        RedisModule.forRoot(moduleService.movie.getCacheConfig()),
      ],
      providers: [],
      exports: [],
    };
  }
}
