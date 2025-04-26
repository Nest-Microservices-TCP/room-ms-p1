import { Controller } from '@nestjs/common';

import {
  CreateReservationRequest,
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
}
