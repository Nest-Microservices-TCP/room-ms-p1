import { plainToInstance } from 'class-transformer';
import { ReservationResponseDto } from './dto/response';
import { ReservationsRepository } from './repository/reservations.repository';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

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
}
