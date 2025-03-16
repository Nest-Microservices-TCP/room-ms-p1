import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoomType as IRoomType } from 'src/grpc/proto/rooms/rooms_types.pb';

import { BaseEntity } from 'src/common/entity';

import { Room } from 'src/rooms/entity/room.entity';
import { RoomTypeAmenity } from 'src/rooms-types-amenities/entity/room-type-amenity.entity';

@Entity({ name: 'rooms_types' })
export class RoomType extends BaseEntity implements IRoomType {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_RoomsTypes',
    name: 'room_type_id',
  })
  room_type_id: string;

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

  @Column({
    name: 'included_people',
    type: 'smallint',
    nullable: true,
  })
  includedPeople: number;

  // Un mismo room_type puede estar asociado a muchas habitaciones
  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];

  @OneToMany(
    () => RoomTypeAmenity,
    (roomTypeAmenity) => roomTypeAmenity.roomType,
  )
  roomsTypesAmenities: RoomTypeAmenity[];
}
