import { ReservationOrigin, ReservationState } from 'src/reservations/enum';

export class ReservationResponseDto {
  reservation_id: string;
  checkoutDate: Date;
  departureDate: Date;
  peopleQuantity: number;
  state: ReservationState;
  total: number;
  origin: ReservationOrigin;
  balance: number;
}
