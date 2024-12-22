import { ReservationState } from 'src/reservations-states/entity/reservation-state.entity';
import { IBaseRepository } from 'src/common/interfaces';
import {
  UpdateReservationStateDto,
  CreateReservationStateDto,
} from 'src/reservations-states/dto/request';

export interface IReservationsStatesRepository
  extends IBaseRepository<
    ReservationState,
    CreateReservationStateDto,
    UpdateReservationStateDto
  > {}
