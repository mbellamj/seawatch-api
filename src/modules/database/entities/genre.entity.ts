import { IGenre, WithLanguage } from '@core/interfaces';
import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Genre implements IGenre {
  @PrimaryColumn({ update: false })
  @IsUUID()
  public id: string;

  @Column({ type: 'json' })
  public name: WithLanguage<string>;
}
