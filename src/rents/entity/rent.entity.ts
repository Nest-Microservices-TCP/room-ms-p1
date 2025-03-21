import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  Generated,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/entity';

import { AccommodationType, EntryType, PaymentState, RentState } from '../enum';

import { Room } from 'src/rooms/entity/room.entity';
import { RentSubtotals } from './rent-subtotals.entity';
import { RentExtra } from 'src/rents-extras/entity/rent-extra.entity';

@Entity({ name: 'rents' })
export class Rent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Rents',
    name: 'rent_id',
  })
  rentId: string;

  @Column({
    name: 'folio',
    type: 'integer',
    nullable: false,
  })
  @Generated('increment')
  folio: number;

  @Column({
    name: 'checkout_date',
    type: 'timestamp with time zone',
    nullable: false,
  })
  checkoutDate: Date;

  @Column({
    name: 'departure_at',
    type: 'timestamp with time zone',
    nullable: false,
  })
  departureAt: Date;

  @Column({
    name: 'entry_type',
    type: 'enum',
    enum: EntryType,
    nullable: false,
  })
  entryType: EntryType;

  @Column({
    name: 'total_income',
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  totalIncome: number;

  @Column({
    name: 'rent_state',
    type: 'enum',
    enum: RentState,
    nullable: false,
    default: RentState.ACTIVE,
  })
  rentState: RentState;

  @Column({
    name: 'payment_state',
    type: 'enum',
    enum: PaymentState,
    default: PaymentState.PENDING_PAYMENT,
    nullable: false,
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
    nullable: false,
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
  @OneToOne(() => RentSubtotals, (subtotals) => subtotals.rent, {
    cascade: true,
    nullable: false,
  })
  rentSubtotals: RentSubtotals;

  /**
   * * Relación ManyToMany a traves de una tabla intermedia/pivote.
   *
   * Se establece una relación OneToMany hacia la tabla intermedia usando
   * la entidad como la relación, lo mismo ocurrirá para la contraparte o
   * la tabla con la que se esta conectando a traves de la tabla pivote
   */

  /**
   * * { cascade: true }
   * Esto asegura que las operaciones de inserción y actualización se
   * realicen en cascada. Si por ejemplo, se añade o modifica una relación
   * en Extra, los cambios se propagaran automáticamente a la tabla
   * intermedia RentsExtras
   */
  @OneToMany(() => RentExtra, (rentExtra) => rentExtra.rent, {
    cascade: true,
    nullable: false,
  })
  rentExtras: RentExtra[];

  @OneToOne(() => Room, (room) => room.rent, { nullable: false })
  @JoinColumn({
    name: 'room_id',
    referencedColumnName: 'room_id',
    foreignKeyConstraintName: 'FK_Rent_Room',
  })
  room: Room;
}
