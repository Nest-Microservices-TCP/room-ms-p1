import { ReservationsStatesRepository } from './repository/reservations-states.repository';
import { ReservationStateResponseDto } from './dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
import {
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from './dto/request';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { DeleteResultResponse } from 'src/common/dto/response';

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

  @HandleRpcExceptions()
  async findAll(): Promise<ReservationStateResponseDto[]> {
    const reservations = await this.reservationsStatesRepository.findAll();

    return this.plainToInstanceDto(reservations);
  }

  @HandleRpcExceptions()
  async findOne(
    reservationStateId: string,
  ): Promise<ReservationStateResponseDto> {
    const reservationState =
      await this.reservationsStatesRepository.findOne(reservationStateId);

    return this.plainToInstanceDto(reservationState);
  }

  @HandleRpcExceptions()
  async findByIds(
    reservationsStatesIds: string[],
  ): Promise<ReservationStateResponseDto[]> {
    const reservationsStates =
      await this.reservationsStatesRepository.findByIds(reservationsStatesIds);

    return this.plainToInstanceDto(reservationsStates);
  }

  @HandleRpcExceptions()
  async save(
    request: CreateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    const newReservationState =
      await this.reservationsStatesRepository.save(request);

    return this.plainToInstanceDto(newReservationState);
  }

  @HandleRpcExceptions()
  async update(
    request: UpdateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    const updatedReservationState =
      await this.reservationsStatesRepository.update(request);

    return this.plainToInstanceDto(updatedReservationState);
  }

  @HandleRpcExceptions()
  async remove(reservationStateId: string): Promise<DeleteResultResponse> {
    const deleteResult =
      await this.reservationsStatesRepository.remove(reservationStateId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
