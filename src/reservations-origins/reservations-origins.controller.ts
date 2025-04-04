import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  ReservationOrigin,
  CreateReservationOriginRequest,
  FindOneReservationOriginRequest,
  FindReservationsOriginsResponse,
  ReservationsOriginsServiceController,
  ReservationsOriginsServiceControllerMethods,
} from 'src/grpc/proto-files/rooms/reservations_origins.pb';

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

  find():
    | Promise<FindReservationsOriginsResponse>
    | Observable<FindReservationsOriginsResponse>
    | FindReservationsOriginsResponse {
    return this.reservationsOriginsService.find();
  }
}
