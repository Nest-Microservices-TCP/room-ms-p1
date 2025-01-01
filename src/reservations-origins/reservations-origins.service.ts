import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';
import { ReservationOriginResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsOriginsService {
  constructor(
    private readonly reservationsOriginsRepository: ReservationsOriginsRepository,
  ) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(ReservationOriginResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ReservationOriginResponseDto[]> {
    const reservationsOrigins =
      await this.reservationsOriginsRepository.findAll();

    return this.plainToInstanceDto(reservationsOrigins);
  }
}
