import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateReservationOriginDto,
  UpdateReservationOriginDto,
} from './dto/request';
import { ReservationOriginResponseDto } from './dto/response';

import { ReservationsOriginsRepository } from './repository/reservations-origins.repository';

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

  @HandleRpcExceptions()
  async update(
    request: UpdateReservationOriginDto,
  ): Promise<ReservationOriginResponseDto> {
    const { reservationOriginId, ...rest } = request;

    const updatedReservationOrigin =
      await this.reservationsOriginsRepository.update(
        { reservationOriginId },
        rest,
      );

    return this.plainToInstanceDto(updatedReservationOrigin);
  }

  @HandleRpcExceptions()
  async remove(reservationOriginId: string): Promise<DeleteResultResponse> {
    const deleteResult =
      await this.reservationsOriginsRepository.remove(reservationOriginId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
