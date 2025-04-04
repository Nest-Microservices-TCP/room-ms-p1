import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationState as IReservationState } from 'src/grpc/proto-files/rooms/reservations_states.pb';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'reservations_states' })
export class ReservationState extends BaseEntity implements IReservationState {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_ReservationStates',
  })
  reservation_state_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
}
