import { ReservationsStatesRepository } from './repository/reservations-states.repository';
import { ReservationStateResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsStatesService {
  constructor(
    private readonly reservationsStatesRepository: ReservationsStatesRepository,
  ) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(ReservationStateResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
