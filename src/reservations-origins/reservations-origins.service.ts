import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateReservationOriginRequest,
  FindOneReservationOriginRequest,
} from 'src/grpc/proto/rooms/reservations_origins.pb';

import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';
import { ReservationOrigin } from './entity/reservation-origin.entity';

@Injectable()
export class ReservationsOriginsService {
  constructor(
    private readonly reservationsOriginsRepository: ReservationsOriginsRepository,
  ) {}

  @HandleRpcExceptions()
  save(request: CreateReservationOriginRequest): void {
    this.reservationsOriginsRepository.save(request);
  }

  @HandleRpcExceptions()
  findOne(
    request: FindOneReservationOriginRequest,
  ): Promise<ReservationOrigin> {
    const { reservation_origin_id } = request;

    return this.reservationsOriginsRepository.findOne(reservation_origin_id);
  }
}
