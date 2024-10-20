import { ExtraEntity } from 'src/extras/entity/extra.entity';
import { RentEntity } from 'src/rents/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rents_extras' })
export class RentExtraEntity {
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

  //Todo: Añadir relaciones con las tablas
  extra: ExtraEntity;
  rent: RentEntity;
}
