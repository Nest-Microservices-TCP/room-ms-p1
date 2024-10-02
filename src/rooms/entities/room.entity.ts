import { BaseEntity } from 'src/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_id',
  })
  room_id: string;

  @Column({
    name: 'number',
    type: 'int',
    nullable: false,
  })
  number: number;
}
