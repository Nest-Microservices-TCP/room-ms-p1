import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  Rate as IRate,
  AccommodationType,
} from 'src/grpc/proto-files/rooms/rates.pb';
import { BaseEntity } from 'src/common/entity';
import { RateExtra } from 'src/rates-extras/entity/rate-extra.entity';

@Entity({ name: 'rates' })
export class Rate extends BaseEntity implements IRate {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Rates',
  })
  rate_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'interval',
    nullable: false,
  })
  duration: string;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  accommodation_cost: number;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  extra_accommodation_cost: number;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  overtime_cost: number;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  extra_people_cost: number;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  early_check_in_cost: number;

  @Column({
    type: 'enum',
    enum: AccommodationType,
    nullable: false,
  })
  accommodation_type: AccommodationType;

  @Column({
    type: 'time',
    nullable: false,
  })
  check_in_hour: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  checkout_hour: string;

  @OneToMany(() => RateExtra, (rateExtra) => rateExtra.rate, {
    nullable: false,
    cascade: true,
  })
  rateExtras: RateExtra[];
}
