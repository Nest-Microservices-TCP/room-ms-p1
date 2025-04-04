import { Extra } from 'src/extras/entity/extra.entity';
import { Extra as IExtra } from 'src/grpc/proto-files/rooms/extras.pb';
import { Rate as IRate } from 'src/grpc/proto-files/rooms/rates.pb';
import { Rate } from 'src/rates/entity/rate.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
