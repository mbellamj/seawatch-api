import { Category, Genre } from '@core/entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDatabaseService {
  abstract categories: IGenericRepository<Category>;

  abstract genres: IGenericRepository<Genre>;
}
