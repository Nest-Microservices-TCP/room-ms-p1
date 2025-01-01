import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';
import { ReservationOriginResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

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

  @HandleRpcExceptions()
  async findAll(): Promise<ReservationOriginResponseDto[]> {
    const reservationsOrigins =
      await this.reservationsOriginsRepository.findAll();

    return this.plainToInstanceDto(reservationsOrigins);
  }

  @HandleRpcExceptions()
  async findOne(
    reservationOriginId: string,
  ): Promise<ReservationOriginResponseDto> {
    const reservationOrigin =
      await this.reservationsOriginsRepository.findOne(reservationOriginId);

    return this.plainToInstanceDto(reservationOrigin);
  }
}
