import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RentExtra } from 'src/rents-extras/entity/rent-extra.entity';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'extras' })
export class Extra extends BaseEntity {
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
  @OneToMany(() => RentExtra, (rentExtra) => rentExtra.extra, {
    cascade: true,
  })
  rentExtras: RentExtra[];
}
