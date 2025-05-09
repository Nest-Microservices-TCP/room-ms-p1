import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  ReservationState,
  CreateReservationStateRequest,
  FindOneReservationStateRequest,
  FindReservationsStatesResponse,
  FindReservationsStatesByIdsRequest,
  ReservationsStatesServiceController,
  ReservationsStatesServiceControllerMethods,
} from 'src/grpc/rooms/reservations_states.pb';

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
  findOne(
    request: FindOneReservationStateRequest,
  ):
    | Promise<ReservationState>
    | Observable<ReservationState>
    | ReservationState {
    return this.reservationsStatesService.findOne(request);
  }
  find():
    | Promise<FindReservationsStatesResponse>
    | Observable<FindReservationsStatesResponse>
    | FindReservationsStatesResponse {
    return this.reservationsStatesService.find();
  }
  findByIds(
    request: FindReservationsStatesByIdsRequest,
  ):
    | Promise<FindReservationsStatesResponse>
    | Observable<FindReservationsStatesResponse>
    | FindReservationsStatesResponse {
    return this.reservationsStatesService.findByIds(request);
  }
}
