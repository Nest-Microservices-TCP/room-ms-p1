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
  total: number;

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
  balance: number;
}
