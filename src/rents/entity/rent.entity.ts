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

  @Column({
    name: 'entry_type',
    type: 'enum',
    enum: EntryType,
  })
  entryType: EntryType;

  @Column({
    name: 'total_income',
    type: 'numeric',
    precision: 9,
    scale: 2,
    default: null,
    nullable: true,
  })
  totalIncome: number;

  @Column({
    name: 'rent_state',
    type: 'enum',
    enum: RentState,
  })
  rentState: RentState;

  @Column({
    name: 'payment_state',
    type: 'enum',
    enum: PaymentState,
  })
  paymentSate: PaymentState;

  @Column({
    name: 'guest_name',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  guestName: string;

  @Column({
    name: 'accommodation_type',
    type: 'enum',
    enum: AccommodationType,
  })
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
