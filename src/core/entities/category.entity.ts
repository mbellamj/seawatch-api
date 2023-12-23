import { WithLanguage } from '@core/interfaces/language.interface';
import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn({ update: false })
  @IsUUID()
  public id: string;

  @Column({ type: 'json' })
  public title: WithLanguage<string>;

  constructor() {}
}
