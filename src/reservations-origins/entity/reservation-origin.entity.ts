import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationOrigin as IReservationOrigin } from 'src/grpc/proto/rooms/reservations_origins.pb';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'reservations_origins' })
export class ReservationOrigin
  extends BaseEntity
  implements IReservationOrigin
{
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_ReservationsOrigins',
  })
  reservation_origin_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;
}
