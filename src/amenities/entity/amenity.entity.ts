import { BaseEntity } from 'src/common/entity';
import { RoomTypeAmenity } from 'src/rooms-types-amenities/entity/room-type-amenity.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'amenities' })
export class Amenity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'amenity_id',
    primaryKeyConstraintName: 'PK_amenities',
  })
  amenityId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'quantity',
    type: 'smallint',
    nullable: false,
  })
  quantity: number;

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
