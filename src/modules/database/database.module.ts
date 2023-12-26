import { IDatabaseService, IModuleConfigService } from '@core/abstracts';
import { CATEGORY_CONFIG_TOKEN, GENRE_CONFIG_TOKEN } from '@core/contants';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Category, Genre } from './entities';

@Module({})
export class DatabaseModule {
  public static forRoot(moduleService: IModuleConfigService): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          schema: 'public',
          ...moduleService.category.getDatabaseConfig(),
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          ...moduleService.genre.getDatabaseConfig(),
        }),
        TypeOrmModule.forRoot({
          type: 'mongodb',
          ...moduleService.movie.getDatabaseConfig(),
        }),

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
    };
  }
}
