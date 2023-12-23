import { RedisModule } from '@libraries/redis';
import {
  GenreModule,
  getGenreDatabaseConfig,
  getGenreRedisConfig,
} from '@modules/genre';
import {
  MovieModule,
  getMovieDatabaseConfig,
  getMovieRedisConfig,
} from '@modules/movie';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CategoryModule,
  getCategoryDatabaseConfig,
  getCategoryRedisConfig,
} from './modules/category';

config();

const categoriesModules = [
  TypeOrmModule.forRoot(getCategoryDatabaseConfig()),
  RedisModule.forRoot(getCategoryRedisConfig()),
  CategoryModule,
];

const genresModules = [
  TypeOrmModule.forRoot(getGenreDatabaseConfig()),
  RedisModule.forRoot(getGenreRedisConfig()),
  GenreModule,
];

const moviesModules = [
  TypeOrmModule.forRoot(getMovieDatabaseConfig()),
  RedisModule.forRoot(getMovieRedisConfig()),
  MovieModule,
];

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ...categoriesModules,
    ...genresModules,
    ...moviesModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
