import { IBaseRepository } from 'src/common/repository';
import { CreateReservationStateRequest } from 'src/grpc/proto-files/rooms/reservations_states.pb';
import { ReservationState } from 'src/reservations-states/entity/reservation-state.entity';

export interface IReservationsStatesRepository
  extends IBaseRepository<ReservationState, CreateReservationStateRequest> {}
