import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RentEntity } from 'src/rents/entity/rent.entity';
import { BaseEntity } from 'src/common/entity';

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

  @OneToOne(() => RentEntity, (rent) => rent.room)
  rent: RentEntity;
}
