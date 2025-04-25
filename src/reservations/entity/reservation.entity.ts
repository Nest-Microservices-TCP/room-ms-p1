import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from 'src/common/entity';

import { ReservationOrigin, ReservationState } from '../enum';

@Entity({ name: 'reservations' })
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Reservations',
    name: 'reservation_id',
  })
  reservationId: string;

  @Column({
    name: 'checkout_date',
    type: 'timestamp with time zone',
  })
  checkoutDate: Date;

  @Column({
    name: 'departure_at',
    type: 'timestamp with time zone',
  })
  departureDate: Date;

  @Column({
    name: 'people_quantity',
    type: 'smallint',
  })
  peopleQuantity: number;

  @Column({
    name: 'state',
    type: 'enum',
    enum: ReservationState,
  })
  state: ReservationState;

  @Column({
    name: 'total',
    type: 'numeric',
    precision: 9,
    scale: 2,
  })
  total_cents: number;

  @Column({
    type: 'varchar',
    length: '3',
    nullable: false,
  })
  total_currency: string;

  @Column({
    name: 'origin',
    type: 'enum',
    enum: ReservationOrigin,
  })
  origin: ReservationOrigin;

  @Column({
    name: 'balance',
    type: 'numeric',
    precision: 9,
    scale: 2,
  })
  outstanding_balance_cents: number;

  @Column({
    type: 'varchar',
    length: '3',
    nullable: false,
  })
  outstanding_balance_currency: string;
}
