import { ReservationOrigin, ReservationState } from 'src/reservations/enum';

export class UpdateReservationDto {
  checkoutDate: Date;
  departureDate: Date;
  peopleQuantity: number;
  state: ReservationState;
  total: number;
  origin: ReservationOrigin;
  balance: number;
}
