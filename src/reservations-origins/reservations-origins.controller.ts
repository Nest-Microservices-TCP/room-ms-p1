import { ReservationsOriginsService } from './reservations-origins.service';
import { ReservationOriginResponseDto } from './dto/response';
import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class ReservationsOriginsController {
  constructor(
    private readonly reservationsOriginsService: ReservationsOriginsService,
  ) {}

  @MessagePattern({ cmd: 'find.all.reservations.origins' })
  async findAll(): Promise<ReservationOriginResponseDto[]> {
    return this.reservationsOriginsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.reservation.origin' })
  async findOne(
    reservationOriginId: string,
  ): Promise<ReservationOriginResponseDto> {
    return this.reservationsOriginsService.findOne(reservationOriginId);
  }
}
