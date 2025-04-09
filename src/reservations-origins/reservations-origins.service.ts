import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreateReservationOriginRequest,
  FindOneReservationOriginRequest,
  FindReservationsOriginsResponse,
  FindReservationsOriginsByIdsRequest,
} from 'src/grpc/proto-files/rooms/reservations_origins.pb';

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

  @HandleRpcExceptions()
  async find(): Promise<FindReservationsOriginsResponse> {
    const reservations_origins =
      await this.reservationsOriginsRepository.find();

    return { reservations_origins };
  }

  @HandleRpcExceptions()
  async findByIds(
    request: FindReservationsOriginsByIdsRequest,
  ): Promise<FindReservationsOriginsResponse> {
    const { reservations_origins_ids } = request;

    const reservations_origins =
      await this.reservationsOriginsRepository.findByIds(
        reservations_origins_ids,
      );

    return { reservations_origins };
  }
}
