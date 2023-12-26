import { ICategory, IGenre } from '@core/interfaces';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDatabaseService {
  abstract categories: IGenericRepository<ICategory>;
  abstract genres: IGenericRepository<IGenre>;
}
