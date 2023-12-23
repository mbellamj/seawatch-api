import { IDatabaseService } from '@core/abstracts';
import {
  CATEGORY_CONFIG_TOKEN,
  GENRE_CONFIG_TOKEN,
  getCategoryDatabaseConfig,
  getGenreDatabaseConfig,
  getMovieDatabaseConfig,
} from '@core/configs';
import { Category, Genre } from '@core/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(getCategoryDatabaseConfig()),
    TypeOrmModule.forRoot(getGenreDatabaseConfig()),
    TypeOrmModule.forRoot(getMovieDatabaseConfig()),

    TypeOrmModule.forFeature([Category], CATEGORY_CONFIG_TOKEN),
    TypeOrmModule.forFeature([Genre], GENRE_CONFIG_TOKEN),
  ],
  providers: [
    {
      provide: IDatabaseService,
      useClass: DatabaseService,
    },
  ],
  exports: [IDatabaseService],
})
export class DatabaseModule {}
