export class CreateRentDto {
  guestName: string;
  accommodationType: 'hotel' | 'motel';
  entryType: 'a_pie' | 'auto'; //TODO: usar el enum
  guests: number;
  extraAccommodations: number;
  extraPeople: number;
  overtime: number;
}
