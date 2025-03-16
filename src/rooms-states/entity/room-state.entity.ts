import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomState as IRoomState } from 'src/grpc/proto/rooms/rooms_states.pb';

import { BaseEntity } from 'src/common/entity';
import { Room } from 'src/rooms/entity/room.entity';

@Entity({ name: 'rooms_states' })
export class RoomState extends BaseEntity implements IRoomState {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_RoomsStates',
  })
  room_state_id: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  // Un room_state puede estar asociado a muchas habitaciones
  @OneToMany(() => Room, (room) => room.roomState)
  rooms: Room[];
}
