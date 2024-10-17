import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto';
import { AccommodationType, EntryType, RentState } from 'src/rents/enum';

export class RentResponseDto extends BaseResponseDto {
  @Expose()
  folio: number;

  @Expose()
  checkoutDate: Date;

  @Expose()
  departureAt: Date;

  @Expose()
  guests: number;

  @Expose()
  extraAccommodations: number;

  @Expose()
  extraPeople: number;

  @Expose()
  overtime: number;

  @Expose()
  entryType: EntryType;

  @Expose()
  totalIncome: number;

  @Expose()
  rentState: RentState;

  @Expose()
  guestName: string;

  @Expose()
  accommodationType: AccommodationType;

  @Expose()
  subtotals: string; //TODO: es un jsonb, revisar una mejor forma

  @Expose()
  roomId: string;

  @Expose()
  rateId: string;

  @Expose()
  hotelId: string;
}
