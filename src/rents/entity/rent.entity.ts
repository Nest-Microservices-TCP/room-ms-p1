import { BaseEntity } from 'src/common';
import { AccommodationType, EntryType, PaymentState, RentState } from '../enum';
import { JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RentSubtotalsEntity } from './rent-subtotals.entity';
import { RoomEntity } from 'src/rooms/entities/room.entity';

export class RentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'rent_id',
  })
  rent_id: string;

  folio: number;
  checkoutDate: Date;
  departureAt: Date;
  guests: number;
  extraAccommodations: number;
  extraPeople: number;
  overtime: number;
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
