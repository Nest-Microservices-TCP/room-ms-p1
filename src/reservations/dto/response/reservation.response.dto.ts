import { ReservationOrigin, ReservationState } from 'src/reservations/enum';
import { ReservationResponse } from 'src/grpc/rooms/reservations.pb';
import { Money } from 'src/grpc/common/common_types.pb';

export class ReservationResponseDto implements ReservationResponse {
  reservation_id: string;
  checkout_date: Date;
  departure_at: Date;
  people_quantity: number;
  state: ReservationState;
  total: Money;
  origin: ReservationOrigin;
  outstanding_balance: Money;
}
