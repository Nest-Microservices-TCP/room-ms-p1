import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateReservationDto, UpdateReservationDto } from './dto/request';
import { ReservationResponseDto } from './dto/response';

import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @MessagePattern('reservations.find.all')
  async findAll(): Promise<ReservationResponseDto[]> {
    return this.reservationsService.findAll();
  }

  @MessagePattern('reservations.find.one')
  async findOne(
    @Payload('reservationId') reservationId: string,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.findOne(reservationId);
  }

  @MessagePattern('reservations.find.by.ids')
  async findByIds(
    @Payload('reservationsIds') reservationsIds: string[],
  ): Promise<ReservationResponseDto[]> {
    return this.reservationsService.findByIds(reservationsIds);
  }

  @MessagePattern('reservations.save')
  async save(
    @Payload() request: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.save(request);
  }

  @MessagePattern('reservations.update')
  async update(
    @Payload() request: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.update(request);
  }

  @MessagePattern('reservations.remove')
  async remove(
    @Payload('reservationId') reservationId: string,
  ): Promise<DeleteResultResponse> {
    return this.reservationsService.remove(reservationId);
  }
}
