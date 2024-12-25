import { ReservationsStatesService } from './reservations-states.service';
import { Controller } from '@nestjs/common';

@Controller()
export class ReservationsStatesController {
  constructor(
    private readonly reservationsStatesService: ReservationsStatesService,
  ) {}
}
