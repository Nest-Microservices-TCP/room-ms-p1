import { plainToInstance } from 'class-transformer';
import { ReservationResponseDto } from './dto/response';
import { ReservationsRepository } from './repository/reservations.repository';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateReservationDto, UpdateReservationDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';

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
  async findOneById(reservationId: string): Promise<ReservationResponseDto> {
    const reservation =
      await this.reservationsRepository.findOneById(reservationId);

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
}
