import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AccommodationType } from 'src/rents/enum';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'rates' })
export class Rate extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'rate_id',
    primaryKeyConstraintName: 'PK_rates',
  })
  rateId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    name: 'duration',
    type: 'time',
    nullable: false,
  })
  duration: string;

  @Column({
    name: 'accommodation_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  accommodationCost: number;

  @Column({
    name: 'extra_accommodation_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  extraAccommodationCost: number;

  @Column({
    name: 'overtime_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  overtimeCost: number;

  @Column({
    name: 'extra_people_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  extraPeopleCost: number;

  @Column({
    name: 'early_checkin_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  earlyCheckinCost: number;

  @Column({
    name: 'accommodation_type',
    type: 'enum',
    enum: AccommodationType,
    nullable: false,
  })
  accommodationType: AccommodationType;

  @Column({
    name: 'checkin_hour',
    type: 'time',
    nullable: false,
  })
  checkInHour: string;

  @Column({
    name: 'checkout_hour',
    type: 'time',
    nullable: false,
  })
  checkoutHour: string;
}
