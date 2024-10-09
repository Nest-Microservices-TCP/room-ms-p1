import { AccommodationType, EntryType } from 'src/rents/enum';

export class CreateRentDto {
  guestName: string;
  accommodationType: AccommodationType;
  entryType: EntryType;
  guests: number;
  extraAccommodations: number;
  extraPeople: number;
  overtime: number;
}
