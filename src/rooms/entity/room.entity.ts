import { BaseEntity } from 'src/common/entity';
import { Rent } from 'src/rents/entity/rent.entity';

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_id',
  })
  roomId: string;

  @Column({
    name: 'number',
    type: 'int',
    nullable: false,
    unique: true,
  })
  number: number;

  @OneToOne(() => Rent, (rent) => rent.room)
  rent: Rent;
}
