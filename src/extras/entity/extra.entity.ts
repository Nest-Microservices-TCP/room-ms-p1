import { BaseEntity } from 'src/common/entity';
import { ExtraType } from '../enum';
import { RentEntity } from 'src/rents/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'extras' })
export class ExtraEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'extra_id',
  })
  extraId: string;

  @Column({
    name: 'extra_type',
    type: 'enum',
    enum: ExtraType,
  })
  extraType: ExtraType; //TODO: En lugar de ser un enum, se tendría un nombre pudiendo crear mas extras

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

  //TODO: Agregar tabla intermedia para la relación con rentas
  rent: RentEntity;
}
