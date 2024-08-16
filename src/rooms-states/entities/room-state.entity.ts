import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'rooms_states' })
export class RoomStateEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;
}
