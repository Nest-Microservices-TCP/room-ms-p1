import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @Column({
    name: 'number',
    type: 'int',
    nullable: false,
  })
  number: number;
}
