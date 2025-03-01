import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Room as IRoom } from 'src/grpc/proto/rooms/rooms.pb';

import { BaseEntity } from 'src/common/entity';

import { Rent } from 'src/rents/entity/rent.entity';
import { RoomState } from 'src/rooms-states/entity/room-state.entity';
import { RoomType } from 'src/rooms-types/entity/room-type.entity';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity implements IRoom {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Rooms',
  })
  room_id: string;

  @Column({
    type: 'int',
    nullable: false,
    unique: true,
  })
  number: number;

  @OneToOne(() => Rent, (rent) => rent.room)
  rent: Rent;

  @OneToOne(() => RoomState, (roomState) => roomState.room)
  @JoinColumn({
    /**
     * @name Establece el nombre que tendrá la columna que almacenara
     * la clave foránea de la relación
     *
     * @referencedColumnName Define el nombre de la columna sobre la
     * cual se hará la referencia de la clave foránea de la otra tabla
     * de la relación. Si no se define por defecto typeorm toma la
     * clave primaria de la tabla referenciada como la referencia para
     * la clave foránea. Esta es mas común usarla cuando se quiere usar
     * otra columna diferente al ID como clave foránea
     *
     * Esta propiedad es de la clase con TypeScript que representa a la
     * columna en la base de datos
     *
     * @foreignKeyConstraintName Define el nombre de la constraint que
     * se genera para la clave foránea, si no se define, TypeORM genera
     * una de forma automática
     *
     * ! NOTA: La entidad que tenga el decorador @JoinColumn es la que
     * ! almacenara la clave foránea de forma física. En una relación
     * ! @ManyToMany ambas tablas tienen el @JoinColumn
     */
    name: 'room_state_id',
    referencedColumnName: 'room_state_id',
    foreignKeyConstraintName: 'FK_Room_RoomState',
  })
  roomState: RoomState;

  @OneToOne(() => RoomType, (roomType) => roomType.room)
  @JoinColumn({
    name: 'room_type_id',
    foreignKeyConstraintName: 'FK_Room_RoomType',
  })
  roomType: RoomType;
}
