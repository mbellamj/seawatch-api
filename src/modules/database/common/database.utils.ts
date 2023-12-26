import { IEntityType } from '@core/abstracts';

export function toDatabase<T>(props: T): IEntityType<T> {
  return {
    ...props,
    updatedAt: new Date(),
  };
}

export function fromDatabase<T>(entity: IEntityType<T>) {
  const { createdAt, updatedAt, ...rest } = entity;

  return rest as T;
}
