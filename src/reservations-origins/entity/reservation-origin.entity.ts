import { BaseEntity } from 'src/common/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reservations_origins' })
export class ReservationOrigin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'reservation_origin_id',
    primaryKeyConstraintName: 'PK_reservations_origins',
  })
  reservationOriginId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description?: string;
}
