import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from 'src/common/entity';

import { Room } from 'src/rooms/entity/room.entity';

@Entity({ name: 'rooms_states' })
export class RoomState extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_RoomsStates',
    name: 'room_state_id',
  })
  roomStateId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 30,
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

  @OneToOne(() => Room, (room) => room.roomState)
  room: Room;
}
