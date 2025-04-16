import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateReservationStateRequest,
  FindOneReservationStateRequest,
} from 'src/grpc/rooms/reservations_states.pb';

import { ReservationsStatesRepository } from './repository/reservations-states.repository';

import { ReservationState } from './entity/reservation-state.entity';

@Injectable()
export class ReservationsStatesService {
  constructor(
    private readonly reservationsStatesRepository: ReservationsStatesRepository,
  ) {}

  @HandleRpcExceptions()
  save(request: CreateReservationStateRequest): void {
    this.reservationsStatesRepository.save(request);
  }

  @HandleRpcExceptions()
  findOne(request: FindOneReservationStateRequest): Promise<ReservationState> {
    const { reservation_state_id } = request;

    return this.reservationsStatesRepository.findOne(reservation_state_id);
  }
}
