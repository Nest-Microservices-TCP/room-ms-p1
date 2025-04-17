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

import { Rent as IRent } from 'src/grpc/rooms/rents.pb';
import { AccommodationType } from 'src/grpc/rooms/rates.pb';
import { EntryType, RentState } from 'src/grpc/rooms/rents.pb';
import { Currency, PaymentState } from 'src/grpc/common/common_enums.pb';

import { Room } from 'src/rooms/entity/room.entity';
import { RentSubtotals } from './rent-subtotals.entity';
import { RentExtra } from 'src/rents-extras/entity/rent-extra.entity';

@Entity({ name: 'rents' })
export class Rent extends BaseEntity implements IRent {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Rents',
  })
  rent_id: string;

  //TODO: Usar secuencias o la parte del manejador de folios
  @Column({
    name: 'folio',
    type: 'integer',
    nullable: false,
  })
  @Generated('increment')
  folio: number;

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  checkout_date: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  departure_at: Date;

  @Column({
    type: 'enum',
    enum: EntryType,
    nullable: false,
  })
  entry_type: EntryType;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  total_income_cents: number;

  @Column({
    type: 'enum',
    enum: Currency,
    nullable: false,
  })
  currency: Currency;

  @Column({
    type: 'enum',
    enum: RentState,
    nullable: false,
    default: RentState.ACTIVE,
  })
  rent_state: RentState;

  @Column({
    type: 'enum',
    enum: PaymentState,
    default: PaymentState.PENDING_PAYMENT,
    nullable: false,
  })
  payment_state: PaymentState;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  guest_name: string;

  @Column({
    type: 'enum',
    enum: AccommodationType,
    nullable: false,
  })
  accommodation_type: AccommodationType;

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
