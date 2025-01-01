import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';
import { ReservationOriginResponseDto } from './dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateReservationOriginDto } from './dto/request';
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

  @HandleRpcExceptions()
  async findByIds(
    reservationsOriginsIds: string[],
  ): Promise<ReservationOriginResponseDto[]> {
    const reservationsOrigins =
      await this.reservationsOriginsRepository.findByIds(
        reservationsOriginsIds,
      );

    return this.plainToInstanceDto(reservationsOrigins);
  }

  @HandleRpcExceptions()
  async save(
    request: CreateReservationOriginDto,
  ): Promise<ReservationOriginResponseDto> {
    const newReservationOrigin =
      await this.reservationsOriginsRepository.save(request);

    return this.plainToInstanceDto(newReservationOrigin);
  }
}
