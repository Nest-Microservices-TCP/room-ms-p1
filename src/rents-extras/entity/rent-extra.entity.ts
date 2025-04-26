import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/entity';

import { Rent } from 'src/rents/entity';
import { Extra } from 'src/extras/entity/extra.entity';

@Entity({ name: 'rents_extras' })
export class RentExtra extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_RentsExtras',
    name: 'rent_extra_id',
  })
  rentExtraId: string;

  @Column({
    name: 'quantity',
    type: 'smallint',
    nullable: false,
  })
  quantity: number;

  @Column({
    name: 'total',
    type: 'decimal',
    scale: 2,
    precision: 9,
    nullable: false,
  })
  total: number;

  /**
   * @onDelete @onUpdate
   * Cuando se elimine o actualice un registro de la tabla Rents o
   * Extras, automáticamente se eliminaran o actualizaran los registros
   * correspondientes en esta tabla intermedia RentsExtras
   */
  @ManyToOne(() => Rent, (rent) => rent.rentExtras, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'rent_id',
    referencedColumnName: 'rent_id',
    foreignKeyConstraintName: 'FK_RentsExtras_Rent',
  })
  rent: Rent;

  @ManyToOne(() => Extra, (extra) => extra.rentExtras, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'extra_id',
    referencedColumnName: 'extra_id',
    foreignKeyConstraintName: 'FK_RentsExtras_Extra',
  })
  extra: Extra;
}
