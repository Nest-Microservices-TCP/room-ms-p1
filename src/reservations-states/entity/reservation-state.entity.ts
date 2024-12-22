import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reservations-states' })
export class ReservationState {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_reservation_state_id',
    name: 'reservation_state_id',
  })
  reservationStateId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;
}
