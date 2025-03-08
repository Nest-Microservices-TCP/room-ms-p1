import { Controller } from '@nestjs/common';

import {
  CreateReservationStateRequest,
  ReservationsStatesServiceController,
  ReservationsStatesServiceControllerMethods,
} from 'src/grpc/proto/rooms/reservations_states.pb';

import { ReservationsStatesService } from './reservations-states.service';

@Controller()
@ReservationsStatesServiceControllerMethods()
export class ReservationsStatesController
  implements ReservationsStatesServiceController
{
  constructor(
    private readonly reservationsStatesService: ReservationsStatesService,
  ) {}

  save(request: CreateReservationStateRequest): void {
    this.reservationsStatesService.save(request);
  }
}
