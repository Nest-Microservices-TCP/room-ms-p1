import { AccommodationType, EntryType, PaymentState, RentState } from '../enum';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RentSubtotalsEntity } from './rent-subtotals.entity';
import { RoomEntity } from 'src/rooms/entity/room.entity';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'rent' })
export class RentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'rent_id',
  })
  rentId: string;

  @Column({
    name: 'folio',
    type: 'integer',
  })
  @Generated('increment')
  folio: number;

  @Column({
    name: 'checkout_date',
    type: 'timestamp with time zone',
  })
  checkoutDate: Date;

  @Column({
    name: 'departure_at',
    type: 'timestamp with time zone',
  })
  departureAt: Date;
  entryType: EntryType;
  totalIncome: number;
  rentState: RentState;
  paymentSate: PaymentState;
  guestName: string;
  accommodationType: AccommodationType;

  /**
   * @OneToOne Relación 1:1
   * El enlace se hace a traves de los campos de relación de entidad
   * Se debe agregar el tipado de la entidad
   *
   * El parámetro 'cascade: true' asegura que cuando se cree una
   * nueva renta, automáticamente se cree su registro asociado en
   * rent_subtotals. De esta forma no se tienen que crear manualmente
   * los subtotales cuando se generen nuevas rentas
   *
   * Lo mismo ocurre para actualizaciones y eliminaciones
   */
  @OneToOne(() => RentSubtotalsEntity, (subtotals) => subtotals.rent, {
    cascade: true,
  })
  rentSubtotals: RentSubtotalsEntity;

  @OneToOne(() => RoomEntity, (room) => room.rent)
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;
}
