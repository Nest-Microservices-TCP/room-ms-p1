import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Amenity } from 'src/amenities/entity/amenity.entity';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

/**
 * Cuando una tabla intermedia contiene otros campos a parte de las
 * claves foráneas de la relación es prácticamente obligatorio crear
 * una entidad a parte para esta tabla dentro de su propio modulo.
 *
 * Y por ende, ahora para establecer la relación @ManyToMany entre
 * room-type y amenity se usa una relación @OneToMany de la entidades
 * hacia la tabla intermedia y @ManyToOne de la tabla intermedia hacia
 * las entidades
 */
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
    /**
     * * onDelete
     * Si se elimina un registro en RoomType, la base de datos automáticamente
     * elimina todas las relaciones asociadas en esta tabla intermedia sin
     * necesidad de definir esta lógica de eliminación en el código
     *
     * ! Nota:
     * La propiedad onDelete: 'CASCADE' siempre debe estar definida
     * en los registros que estén asociados a la entidad principal, asi se
     * mantiene la integridad referencial. Es decir, aquí nos importa que
     * si ya no existe la entidad principal (RoomType) sus relaciones se
     * eliminen para mantener la integridad, no al revés, si una relación
     * se elimina no necesariamente queremos que se elimine la entidad
     * principal
     */
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'room_type_id',
    referencedColumnName: 'room_type_id',
    foreignKeyConstraintName: 'FK_RoomsTypesAmenities_RoomType',
  })
  roomType: RoomType;

  @ManyToOne(() => Amenity, (amenity) => amenity.roomsTypesAmenities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'amenity_id',
    referencedColumnName: 'amenity_id',
    foreignKeyConstraintName: 'FK_RoomsTypesAmenities_Amenity',
  })
  amenity: Amenity;
}
