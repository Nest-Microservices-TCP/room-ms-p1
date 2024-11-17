import { ReservationOrigin, ReservationState } from 'src/reservations/enum';
import { Expose } from 'class-transformer';

export class ReservationResponseDto {
  @Expose()
  reservation_id: string;

  @Expose()
  checkoutDate: Date;

  @Expose()
  departureDate: Date;

  @Expose()
  peopleQuantity: number;

  @Expose()
  state: ReservationState;

  @Expose()
  total: number;

  @Expose()
  origin: ReservationOrigin;

  @Expose()
  balance: number;
}
