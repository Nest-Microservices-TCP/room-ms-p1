import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Amenity as IAmenity } from 'src/grpc/rooms/amenities.pb';

import { BaseEntity } from 'src/common/entity';
import { RoomTypeAmenity } from 'src/rooms-types-amenities/entity/room-type-amenity.entity';

@Entity({ name: 'amenities' })
export class Amenity extends BaseEntity implements IAmenity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Amenities',
    name: 'amenity_id',
  })
  amenity_id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @OneToMany(
    () => RoomTypeAmenity,
    (roomTypeAmenity) => roomTypeAmenity.amenity,
  )
  roomsTypesAmenities: [];
}
