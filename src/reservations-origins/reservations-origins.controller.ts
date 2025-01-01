import { ReservationsOriginsService } from './reservations-origins.service';
import { Controller } from '@nestjs/common';

@Controller()
export class ReservationsOriginsController {
  constructor(
    private readonly reservationsOriginsService: ReservationsOriginsService,
  ) {}
}
