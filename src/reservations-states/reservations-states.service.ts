import { ReservationsStatesRepository } from './repository/reservations-states.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsStatesService {
  constructor(
    private readonly reservationsStatesRepository: ReservationsStatesRepository,
  ) {}
}
