import {
  IEntityType,
  IGenericRepository,
  QueryParams,
  UpdateParams,
} from '@core/abstracts';
import { Repository } from 'typeorm';
import { fromDatabase, toDatabase } from './common/database.utils';

export class DatabaseRepository<T> implements IGenericRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  create(data: T): Promise<T> {
    const now = new Date();
    const entity: IEntityType<T> = { ...data, createdAt: now, updatedAt: now };

    return this.repository.save(entity).then((value) => fromDatabase(value));
  }

  update(data: T, params: UpdateParams<T>): Promise<T> {
    return this.repository
      .update(params, toDatabase(data) as any)
      .then((response) => fromDatabase(response.raw[0] as IEntityType<T>));
  }

  get(params: QueryParams<T>): Promise<T> {
    return this.repository.findOne(params).then((value)=> fromDatabase(value));
  }

  getAll(params: QueryParams<T>): Promise<IEntityType<T>[]> {
    return this.repository.find(params);
  }
}
