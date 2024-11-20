import { plainToInstance } from 'class-transformer';
import { ReservationResponseDto } from './dto/response';
import { ReservationsRepository } from './repository/reservations.repository';
import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateReservationDto } from './dto/request';

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
}
