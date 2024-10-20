import { BaseEntity } from 'src/common/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RentExtraEntity } from 'src/rents-extras/entity/rent-extra.entity';

@Entity({ name: 'extras' })
export class ExtraEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'extra_id',
  })
  extraId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  rentExtras: RentExtraEntity; //TODO: Añadir relación con la tabla pivote
}
