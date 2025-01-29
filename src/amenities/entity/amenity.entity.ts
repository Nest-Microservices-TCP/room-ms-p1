import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from 'src/common/entity';

import { RoomTypeAmenity } from 'src/rooms-types-amenities/entity/room-type-amenity.entity';

@Entity({ name: 'amenities' })
export class Amenity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Amenities',
    name: 'amenity_id',
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
