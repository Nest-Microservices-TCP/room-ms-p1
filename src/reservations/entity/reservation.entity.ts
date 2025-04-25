import { BaseEntity } from 'src/common/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ReservationOrigin, ReservationState } from '../enum';

import { Reservation as IReservation } from 'src/grpc/rooms/reservations.pb';

@Entity({ name: 'reservations' })
export class Reservation extends BaseEntity implements IReservation {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Reservations',
    name: 'reservation_id',
  })
  reservation_id: string;

  @Column({
    name: 'checkout_date',
    type: 'timestamp with time zone',
  })
  checkout_date: Date;

  @Column({
    name: 'departure_at',
    type: 'timestamp with time zone',
  })
  departure_at: Date;

  @Column({
    name: 'people_quantity',
    type: 'smallint',
  })
  people_quantity: number;

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
