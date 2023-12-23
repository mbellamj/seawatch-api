import { FindOneOptions, FindOptionsWhere, ObjectId } from 'typeorm';

export abstract class IGenericRepository<T> {
  abstract create(data: T): Promise<T>;

  abstract update(data: T, params: UpdateParams<T>): Promise<T>;

  abstract get(params: QueryParams<T>): Promise<T>;

  abstract getAll(params: QueryParams<T>): Promise<T[]>;
}

export type UpdateParams<T> =
  | string
  | number
  | Date
  | ObjectId
  | string[]
  | number[]
  | Date[]
  | ObjectId[]
  | FindOptionsWhere<T>;

export type QueryParams<EntityProps> = FindOneOptions<EntityProps>;

export type IEntityType<T> = T &
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>;
