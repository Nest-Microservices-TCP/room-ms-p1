import { ReservationsStatesRepository } from './repository/reservations-states.repository';
import { ReservationStateResponseDto } from './dto/response';
import { HandleRpcExceptions } from 'src/common/decorators';
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
}
