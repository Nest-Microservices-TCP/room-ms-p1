import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AccommodationType } from 'src/rents/enum';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'rates' })
export class RateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'rate_id',
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
  })
  duration: string;

  @Column({
    name: 'accommodation_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
  })
  accommodationCost: number;

  @Column({
    name: 'extra_accommodation_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
  })
  extraAccommodationCost: number;

  @Column({
    name: 'overtime_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
  })
  overtimeCost: number;

  @Column({
    name: 'extra_people_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
  })
  extraPeopleCost: number;

  @Column({
    name: 'early_checkin_cost',
    type: 'numeric',
    precision: 9,
    scale: 2,
  })
  earlyCheckinCost: number;

  @Column({
    name: 'accommodation_type',
    type: 'enum',
    enum: AccommodationType,
  })
  accommodationType: AccommodationType;

  @Column({
    name: 'checkin_hour',
    type: 'time',
  })
  checkInHour: string;

  @Column({
    name: 'checkout_hour',
    type: 'time',
  })
  checkoutHour: string;
}
