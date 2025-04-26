import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { ReservationsRepository } from './repository/reservations.repository';

import {
  ReservationState,
  ReservationResponse,
  CreateReservationRequest,
  FindOneReservationRequest,
} from 'src/grpc/rooms/reservations.pb';
import { Currency } from 'src/grpc/common/common_enums.pb';
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

  async findOne(
    request: FindOneReservationRequest,
  ): Promise<ReservationResponse> {
    const { reservation_id } = request;

    const reservation =
      await this.reservationsRepository.findOne(reservation_id);

    const {
      total_cents,
      total_currency,
      outstanding_balance_cents,
      outstanding_balance_currency,
      ...rest
    } = reservation;

    return {
      ...rest,
      total: {
        amount_cents: total_cents,
        currency: Currency[total_currency],
      },
      outstanding_balance: {
        amount_cents: outstanding_balance_cents,
        currency: Currency[outstanding_balance_currency],
      },
    };
  }
}
