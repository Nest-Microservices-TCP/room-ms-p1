import { BaseEntity } from 'src/common/entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  /**
   * * { cascade: true }
   * Esto asegura que las operaciones de inserción y actualización se
   * realicen en cascada. Si por ejemplo, se añade o modifica una relación
   * en Extra, los cambios se propagaran automáticamente a la tabla
   * intermedia RentsExtras
   */
  @OneToMany(() => RentExtraEntity, (rentExtra) => rentExtra.extra, {
    cascade: true,
  })
  rentExtras: RentExtraEntity[];
}
