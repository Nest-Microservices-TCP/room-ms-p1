import { BaseEntity } from 'src/common';
import { AccommodationType, EntryType, PaymentState, RentState } from '../enum';
import { PrimaryGeneratedColumn } from 'typeorm';

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
}
