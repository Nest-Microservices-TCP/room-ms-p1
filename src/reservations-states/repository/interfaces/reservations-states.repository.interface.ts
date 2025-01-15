import { IRepository } from 'src/common/repository';
import { CreateReservationStateDto } from 'src/reservations-states/dto/request';
import { ReservationState } from 'src/reservations-states/entity/reservation-state.entity';

export interface IReservationsStatesRepository
  extends IRepository<ReservationState, CreateReservationStateDto> {}
