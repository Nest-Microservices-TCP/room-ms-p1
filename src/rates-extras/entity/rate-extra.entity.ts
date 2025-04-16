import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Rate as IRate } from 'src/grpc/rooms/rates.pb';
import { Extra as IExtra } from 'src/grpc/rooms/extras.pb';

import { Rate } from 'src/rates/entity/rate.entity';
import { Extra } from 'src/extras/entity/extra.entity';

@Entity({ name: 'rates_extras' })
export class RateExtra {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_RatesExtras',
  })
  rate_extra_id: string;

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 9,
    nullable: false,
  })
  cost: number;

  @ManyToOne(() => Rate, (rate) => rate.rateExtras, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'rate_id',
    referencedColumnName: 'rate_id',
    foreignKeyConstraintName: 'FK_RatesExtras_Rate',
  })
  rate: IRate; // rate_id

  @ManyToOne(() => Extra, (extra) => extra.rateExtras, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'extra_id',
    referencedColumnName: 'extra_id',
    foreignKeyConstraintName: 'FK_RatesExtras_Extra',
  })
  extra: IExtra; // extra_id
}
