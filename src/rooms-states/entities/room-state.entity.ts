import { BaseEntity } from 'src/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms_states' })
export class RoomStateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_state_id',
  })
  room_state_id: string;

  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;
}
