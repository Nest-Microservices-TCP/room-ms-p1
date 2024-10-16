import { BaseEntity } from 'src/common/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms_states' })
export class RoomStateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_state_id',
  })
  roomStateId: string;

  @Column({
    name: 'name',
    type: 'text',
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
