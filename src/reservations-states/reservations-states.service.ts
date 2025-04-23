import {
  HandleRpcExceptions,
  HandleGrpcExceptions,
} from 'src/common/decorators';
import { Injectable } from '@nestjs/common';

import {
  CreateReservationStateRequest,
  FindOneReservationStateRequest,
  FindReservationsStatesResponse,
  FindReservationsStatesByIdsRequest,
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

  @HandleGrpcExceptions()
  async find(): Promise<FindReservationsStatesResponse> {
    const reservations_states = await this.reservationsStatesRepository.find();

    return { reservations_states };
  }

  @HandleGrpcExceptions()
  async findByIds(
    request: FindReservationsStatesByIdsRequest,
  ): Promise<FindReservationsStatesResponse> {
    const { reservations_states_ids } = request;

    const reservations_states =
      await this.reservationsStatesRepository.findByIds(
        reservations_states_ids,
      );

    return { reservations_states };
  }
}
