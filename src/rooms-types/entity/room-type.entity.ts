import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/entity';

import { RoomTypeAmenity } from 'src/rooms-types-amenities/entity/room-type-amenity.entity';
import { Room } from 'src/rooms/entity/room.entity';

@Entity({ name: 'rooms_types' })
export class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_RoomsTypes',
    name: 'room_type_id',
  })
  roomTypeId: string;

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

  @OneToOne(() => Room, (room) => room.roomType)
  room: Room;

  @OneToMany(
    () => RoomTypeAmenity,
    (roomTypeAmenity) => roomTypeAmenity.roomType,
  )
  roomsTypesAmenities: RoomTypeAmenity[];
}
