import { ReservationsOriginsService } from './reservations-origins.service';
import { ReservationOriginResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { CreateReservationOriginDto } from './dto/request';

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

  @MessagePattern({ cmd: 'find.reservations.origins.bt.ids' })
  async findByIds(
    reservationsOriginsIds: string[],
  ): Promise<ReservationOriginResponseDto[]> {
    return this.reservationsOriginsService.findByIds(reservationsOriginsIds);
  }

  @MessagePattern({ cmd: 'save.reservation.origin' })
  async save(
    @Payload() request: CreateReservationOriginDto,
  ): Promise<ReservationOriginResponseDto> {
    return this.reservationsOriginsService.save(request);
  }
}
