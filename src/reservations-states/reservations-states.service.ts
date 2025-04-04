import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { CreateReservationStateRequest } from 'src/grpc/proto-files/rooms/reservations_states.pb';

import { ReservationsStatesRepository } from './repository/reservations-states.repository';

@Injectable()
export class ReservationsStatesService {
  constructor(
    private readonly reservationsStatesRepository: ReservationsStatesRepository,
  ) {}

  @HandleRpcExceptions()
  save(request: CreateReservationStateRequest): void {
    this.reservationsStatesRepository.save(request);
  }
}
