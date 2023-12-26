import { IDatabaseService } from '@core/abstracts';
import { IGenericRepository } from '@core/abstracts/generic-repository.abstract';
import { CATEGORY_CONFIG_TOKEN, GENRE_CONFIG_TOKEN } from '@core/contants';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseRepository } from './database.repository';
import { Category, Genre } from './entities';

@Injectable()
export class DatabaseService implements IDatabaseService {
  categories: IGenericRepository<Category>;
  genres: IGenericRepository<Genre>;

  constructor(
    @InjectRepository(Category, CATEGORY_CONFIG_TOKEN)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Genre, GENRE_CONFIG_TOKEN)
    private readonly genreRepository: Repository<Genre>,
  ) {
    this.categories = new DatabaseRepository(this.categoryRepository);
    this.genres = new DatabaseRepository(this.genreRepository);
  }
}
