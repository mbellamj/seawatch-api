import { RedisModule } from '@libraries/redis';
import { DatabaseModule } from '@modules/database/database.module';

import {
  getCategoryRedisConfig,
  getGenreRedisConfig,
  getMovieRedisConfig,
} from '@core/configs';
import { CategoryModule } from '@modules/category';
import { GenreModule } from '@modules/genre';
import { MovieModule } from '@modules/movie';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './modules/cache/cache.module';

const categoriesModules = [RedisModule.forRoot(getCategoryRedisConfig())];

const genresModules = [RedisModule.forRoot(getGenreRedisConfig())];

const moviesModules = [RedisModule.forRoot(getMovieRedisConfig())];

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    GenreModule,
    CategoryModule,
    MovieModule,
    DatabaseModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
