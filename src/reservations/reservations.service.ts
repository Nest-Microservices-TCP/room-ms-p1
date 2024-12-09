import { ReservationsRepository } from './repository/reservations.repository';
import { CreateReservationDto, UpdateReservationDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import { ReservationResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  @HandleRpcExceptions()
  async findAll(): Promise<ReservationResponseDto[]> {
    const reservations = await this.reservationsRepository.findAll();

    return plainToInstance(ReservationResponseDto, reservations, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOne(reservationId: string): Promise<ReservationResponseDto> {
    const reservation =
      await this.reservationsRepository.findOne(reservationId);

    return plainToInstance(ReservationResponseDto, reservation, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateReservationDto): Promise<ReservationResponseDto> {
    const newReservation = await this.reservationsRepository.save(request);

    return plainToInstance(ReservationResponseDto, newReservation, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateReservationDto): Promise<ReservationResponseDto> {
    const reservationUpdated =
      await this.reservationsRepository.update(request);

    return plainToInstance(ReservationResponseDto, reservationUpdated, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async remove(reservationId: string): Promise<DeleteResultResponse> {
    const deleteResult =
      await this.reservationsRepository.remove(reservationId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findByIds(
    reservationsIds: string[],
  ): Promise<ReservationResponseDto[]> {
    const reservations =
      await this.reservationsRepository.findByIds(reservationsIds);

    return plainToInstance(ReservationResponseDto, reservations, {
      excludeExtraneousValues: true,
    });
  }
}
