import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entity';
@Entity({ name: 'amenity' })
export class Amenity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'amenity_id',
    primaryKeyConstraintName: 'PK_amenity',
  })
  amenityId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'quantity',
    type: 'smallint',
    nullable: false,
  })
  quantity: number;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;
}
