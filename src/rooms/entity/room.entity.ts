import { BaseEntity } from 'src/common/entity';
import { RentEntity } from 'src/rents/entity/rent.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'room_id',
  })
  roomId: string;

  @Column({
    name: 'number',
    type: 'int',
    nullable: false,
  })
  number: number;

  @OneToOne(() => RentEntity, (rent) => rent.room)
  rent: RentEntity;
}
