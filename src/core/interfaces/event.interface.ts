export type EventType = 'created' | 'updated' | 'deleted';

export interface IDateAt {
  createdAt: Date;
  updatedAt?: Date;
}
