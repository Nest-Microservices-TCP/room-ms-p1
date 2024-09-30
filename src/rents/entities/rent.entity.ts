import { BaseEntity } from 'src/common';
import { AccommodationType, EntryType, PaymentState, RentState } from '../enum';

export class RentEntity extends BaseEntity {
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
  subtotals: string; //TODO: es un jsonb, revisar una mejor forma

  roomId: string;
  rateId: string;
  hotelId: string;
}
