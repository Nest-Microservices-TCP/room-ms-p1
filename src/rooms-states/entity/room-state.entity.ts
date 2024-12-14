import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'rooms_states' })
export class RoomState extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_state_id',
    primaryKeyConstraintName: 'PK_rooms_states',
  })
  roomStateId: string;

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
}
