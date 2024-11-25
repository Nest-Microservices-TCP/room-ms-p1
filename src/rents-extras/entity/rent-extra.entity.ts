import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExtraEntity } from 'src/extras/entity/extra.entity';
import { BaseEntity } from 'src/common/entity';
import { RentEntity } from 'src/rents/entity';

@Entity({ name: 'rents_extras' })
export class RentExtraEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'renta_extra_id',
  })
  rentExtraId: string;

  @Column({
    name: 'quantity',
    type: 'smallint',
  })
  quantity: number;

  @Column({
    name: 'total',
    type: 'decimal',
    scale: 2,
    precision: 9,
  })
  total: number;

  /**
   * @onDelete @onUpdate
   * Cuando se elimine o actualice un registro de la tabla Rents o
   * Extras, automáticamente se eliminaran o actualizaran los registros
   * correspondientes en esta tabla intermedia RentsExtras
   */
  @ManyToOne(() => RentEntity, (rent) => rent.rentExtras, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  rent: RentEntity;

  @ManyToOne(() => ExtraEntity, (extra) => extra.rentExtras, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  extra: ExtraEntity;
}
