import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsOriginsService {
  constructor(
    private readonly reservationsOriginsRepository: ReservationsOriginsRepository,
  ) {}
}
