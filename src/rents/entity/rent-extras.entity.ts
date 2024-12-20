import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rents_extras' })
export class RentsExtras {
  @PrimaryGeneratedColumn('uuid', {
    name: 'rent_extras_id',
    primaryKeyConstraintName: 'PK_rents_extras',
  })
  rentExtrasId: string;

  /**
   * @smallint -32,768 hasta 32,767
   */
  @Column({
    name: 'guests',
    type: 'smallint',
    default: null,
    nullable: true,
  })
  guests: number;

  @Column({
    name: 'extra_accommodations',
    type: 'smallint',
    default: null,
    nullable: true,
  })
  extraAccommodations: number;

  @Column({
    name: 'extra_people',
    type: 'smallint',
    default: null,
    nullable: true,
  })
  extraPeople: number;

  @Column({
    name: 'overtime',
    type: 'smallint',
    default: null,
    nullable: true,
  })
  overtime: number;
}
