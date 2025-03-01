import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Extra as IExtra } from 'src/grpc/proto/rooms/extras.pb';

import { BaseEntity } from 'src/common/entity';
import { RentExtra } from 'src/rents-extras/entity/rent-extra.entity';

@Entity({ name: 'extras' })
export class Extra extends BaseEntity implements IExtra {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Extras',
  })
  extra_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
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
