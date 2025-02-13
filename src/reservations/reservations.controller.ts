import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateReservationDto, UpdateReservationDto } from './dto/request';
import { ReservationResponseDto } from './dto/response';

import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @MessagePattern('rooms.find.all.reservations')
  async findAll(): Promise<ReservationResponseDto[]> {
    return this.reservationsService.findAll();
  }

  @MessagePattern('rooms.find.one.reservation')
  async findOne(
    @Payload('reservationId') reservationId: string,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.findOne(reservationId);
  }

  @MessagePattern('rooms.find.reservations.by.ids')
  async findByIds(
    @Payload('reservationsIds') reservationsIds: string[],
  ): Promise<ReservationResponseDto[]> {
    return this.reservationsService.findByIds(reservationsIds);
  }

  @MessagePattern('rooms.save.reservation')
  async save(
    @Payload() request: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.save(request);
  }

  @MessagePattern('rooms.update.reservation')
  async update(
    @Payload() request: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.update(request);
  }

  @MessagePattern({ cmd: 'remove.reservation.by.id' })
  async remove(
    @Payload('reservationId') reservationId: string,
  ): Promise<DeleteResultResponse> {
    return this.reservationsService.remove(reservationId);
  }
}
