import { ReservationsRepository } from './repository/reservations.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
}
