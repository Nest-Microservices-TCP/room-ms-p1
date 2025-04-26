import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { ReservationsRepository } from './repository/reservations.repository';

import {
  ReservationState,
  CreateReservationRequest,
} from 'src/grpc/rooms/reservations.pb';
import { SaveReservationType } from './types';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  @HandleRpcExceptions()
  async save(request: CreateReservationRequest): Promise<void> {
    const newReservation: SaveReservationType = {
      ...request,
      state: ReservationState.UNASSIGNED,
      outstanding_balance_currency: '',
      outstanding_balance_cents: 0,
      total_currency: '',
      total_cents: 0,
    };

    this.reservationsRepository.save(newReservation);
  }
}
