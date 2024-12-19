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

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(ReservationResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<ReservationResponseDto[]> {
    const reservations = await this.reservationsRepository.findAll();

    return this.plainToInstanceDto(reservations);
  }

  @HandleRpcExceptions()
  async findOne(reservationId: string): Promise<ReservationResponseDto> {
    const reservation =
      await this.reservationsRepository.findOne(reservationId);

    return this.plainToInstanceDto(reservation);
  }

  @HandleRpcExceptions()
  async findByIds(
    reservationsIds: string[],
  ): Promise<ReservationResponseDto[]> {
    const reservations =
      await this.reservationsRepository.findByIds(reservationsIds);

    return this.plainToInstanceDto(reservations);
  }

  @HandleRpcExceptions()
  async save(request: CreateReservationDto): Promise<ReservationResponseDto> {
    const newReservation = await this.reservationsRepository.save(request);

    return this.plainToInstanceDto(newReservation);
  }

  @HandleRpcExceptions()
  async update(request: UpdateReservationDto): Promise<ReservationResponseDto> {
    const reservationUpdated =
      await this.reservationsRepository.update(request);

    return this.plainToInstanceDto(reservationUpdated);
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
