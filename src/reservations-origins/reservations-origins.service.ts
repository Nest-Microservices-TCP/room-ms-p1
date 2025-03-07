import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { CreateReservationOriginRequest } from 'src/grpc/proto/rooms/reservations_origins.pb';

import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';

@Injectable()
export class ReservationsOriginsService {
  constructor(
    private readonly reservationsOriginsRepository: ReservationsOriginsRepository,
  ) {}

  @HandleRpcExceptions()
  save(request: CreateReservationOriginRequest): void {
    this.reservationsOriginsRepository.save(request);
  }
}
