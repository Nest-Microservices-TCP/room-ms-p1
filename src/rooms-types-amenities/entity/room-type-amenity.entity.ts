import { Amenity } from 'src/amenities/entity/amenity.entity';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rooms_types_amenities' })
export class RoomTypeAmenity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_type_amenity_id',
    primaryKeyConstraintName: 'PK_RoomsTypes_Amenities',
  })
  roomTypeAmenityId: string;

  @Column({
    name: 'amenity_quantity',
    type: 'smallint',
    nullable: false,
    default: 1,
  })
  amenityQuantity: number;

  @ManyToOne(() => RoomType, (roomType) => roomType.roomsTypesAmenities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'room_type_id',
    foreignKeyConstraintName: 'FK_RoomsTypesAmenities_RoomType',
  })
  roomType: RoomType;

  amenity: Amenity;
}
