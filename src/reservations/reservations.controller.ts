import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  ReservationResponse,
  CreateReservationRequest,
  FindOneReservationRequest,
  ReservationsServiceController,
  ReservationsServiceControllerMethods,
} from 'src/grpc/rooms/reservations.pb';

import { ReservationsService } from './reservations.service';

@Controller()
@ReservationsServiceControllerMethods()
export class ReservationsController implements ReservationsServiceController {
  constructor(private readonly reservationsService: ReservationsService) {}

  save(request: CreateReservationRequest): void {
    this.reservationsService.save(request);
  }
  findOne(
    request: FindOneReservationRequest,
  ):
    | Promise<ReservationResponse>
    | Observable<ReservationResponse>
    | ReservationResponse {
    return this.reservationsService.findOne(request);
  }
}
