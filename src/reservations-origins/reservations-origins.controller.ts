import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateReservationOriginDto,
  UpdateReservationOriginDto,
} from './dto/request';
import { ReservationOriginResponseDto } from './dto/response';

import { ReservationsOriginsService } from './reservations-origins.service';

@Controller()
export class ReservationsOriginsController {
  constructor(
    private readonly reservationsOriginsService: ReservationsOriginsService,
  ) {}

  @MessagePattern('rooms.find.all.reservationsOrigins')
  async findAll(): Promise<ReservationOriginResponseDto[]> {
    return this.reservationsOriginsService.findAll();
  }

  @MessagePattern('rooms.find.one.reservationOrigin')
  async findOne(
    @Payload('reservationOriginId') reservationOriginId: string,
  ): Promise<ReservationOriginResponseDto> {
    return this.reservationsOriginsService.findOne(reservationOriginId);
  }

  @MessagePattern('rooms.find.reservationsOrigins.by.ids')
  async findByIds(
    @Payload('reservationsOriginsIds') reservationsOriginsIds: string[],
  ): Promise<ReservationOriginResponseDto[]> {
    return this.reservationsOriginsService.findByIds(reservationsOriginsIds);
  }

  @MessagePattern('rooms.save.reservationOrigin')
  async save(
    @Payload() request: CreateReservationOriginDto,
  ): Promise<ReservationOriginResponseDto> {
    return this.reservationsOriginsService.save(request);
  }

  @MessagePattern('rooms.update.reservationOrigin')
  async update(
    request: UpdateReservationOriginDto,
  ): Promise<ReservationOriginResponseDto> {
    return this.reservationsOriginsService.update(request);
  }

  @MessagePattern('rooms.remove.reservationOrigin')
  async remove(reservationOriginId: string): Promise<DeleteResultResponse> {
    return this.reservationsOriginsService.remove(reservationOriginId);
  }
}
