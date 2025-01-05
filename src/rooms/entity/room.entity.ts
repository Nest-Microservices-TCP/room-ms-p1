import { BaseEntity } from 'src/common/entity';
import { Rent } from 'src/rents/entity/rent.entity';
import { RoomState } from 'src/rooms-states/entity/room-state.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_id',
  })
  roomId: string;

  @Column({
    name: 'number',
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
     * @referencesColumnName Define el nombre de la columna sobre la
     * cual se hará la referencia de la clave foránea de la otra tabla
     * de la relación
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
}
