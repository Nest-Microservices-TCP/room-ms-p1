import { AccommodationType, EntryType } from 'src/rents/enum';

export class UpdateRentDto {
  checkoutDate: Date;
  departureAt: Date;
  guests: number;
  extraAccommodations: number;
  extraPeople: number;
  overtime: number;
  entryType: EntryType;
  totalIncome: number;
  rentState: 'finalizada' | 'pagada' | 'pago_pendiente' | 'cancelada'; //TODO: hacer el enum, revisar una mejor forma
  guestName: string;
  accommodationType: AccommodationType;
  subtotals: string; //TODO: es un jsonb, revisar una mejor forma

  roomId: string;
  rateId: string;
  hotelId: string;
}
