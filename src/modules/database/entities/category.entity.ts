import { ICategory, WithLanguage } from '@core/interfaces';
import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Category implements ICategory {
  @PrimaryColumn({ update: false })
  @IsUUID()
  public id: string;

  @Column({ type: 'json' })
  public title: WithLanguage<string>;
}
