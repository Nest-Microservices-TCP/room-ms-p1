import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  ReservationOrigin,
  CreateReservationOriginRequest,
  FindOneReservationOriginRequest,
  ReservationsOriginsServiceController,
  ReservationsOriginsServiceControllerMethods,
} from 'src/grpc/proto/rooms/reservations_origins.pb';

import { ReservationsOriginsService } from './reservations-origins.service';

@Controller()
@ReservationsOriginsServiceControllerMethods()
export class ReservationsOriginsController
  implements ReservationsOriginsServiceController
{
  constructor(
    private readonly reservationsOriginsService: ReservationsOriginsService,
  ) {}

  save(request: CreateReservationOriginRequest): void {
    this.reservationsOriginsService.save(request);
  }

  findOne(
    request: FindOneReservationOriginRequest,
  ):
    | Promise<ReservationOrigin>
    | Observable<ReservationOrigin>
    | ReservationOrigin {
    return this.reservationsOriginsService.findOne(request);
  }
}
