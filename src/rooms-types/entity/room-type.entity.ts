import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'rooms_types' })
export class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_type_id',
    primaryKeyConstraintName: 'PK_rooms_types',
  })
  roomTypeId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'included_people',
    type: 'smallint',
    nullable: true,
  })
  includedPeople: number;
}
