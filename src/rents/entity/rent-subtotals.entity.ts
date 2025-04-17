import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/entity';

import { Rent } from './rent.entity';

@Entity({ name: 'rents_subtotals' })
export class RentSubtotals extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_RentsSubtotals',
    name: 'rent_subtotal_id',
  })
  rentSubtotalId: string;

  @Column({
    name: 'room_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  roomTotal: number;

  @Column({
    name: 'overtime_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  overtimeTotal: number;

  @Column({
    name: 'early_check_in_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  earlyCheckinTotal: number;

  @Column({
    name: 'extra_people_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  extraPeopleTotal: number;

  @Column({
    name: 'extra_accommodations_total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: 0,
    nullable: true,
  })
  extraAccommodationsTotal: number;

  /**
   * @JoinColumn El decorador indica propiedades de la clave foránea
   * a traves de la cual se hace la relación. Aquí indicamos que se
   * cree una columna que almacenara los valores de rent_id, que es
   * la clave primaria de la tabla con la relación 1:1 para que
   * actué como clave foránea en esta tabla
   *
   * La entidad que defina el decorador de JoinColumn es la que
   * almacenara la columna con la clave foránea
   */
  @OneToOne(() => Rent, (rent) => rent.rentSubtotals)
  @JoinColumn({
    name: 'rent_id',
    referencedColumnName: 'rent_id',
    foreignKeyConstraintName: 'FK_Rent_Subtotals',
  })
  rent: Rent;
}
