import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from './dto/request';
import { ReservationStateResponseDto } from './dto/response';

import { ReservationsStatesService } from './reservations-states.service';

@Controller()
export class ReservationsStatesController {
  constructor(
    private readonly reservationsStatesService: ReservationsStatesService,
  ) {}

  @MessagePattern('reservationsStates.find.all')
  async findAll(): Promise<ReservationStateResponseDto[]> {
    return this.reservationsStatesService.findAll();
  }

  @MessagePattern('reservationsStates.find.one')
  async findOne(
    @Payload('reservationStateId') reservationStateId: string,
  ): Promise<ReservationStateResponseDto> {
    return this.reservationsStatesService.findOne(reservationStateId);
  }

  @MessagePattern('reservationsStates.find.by.ids')
  async findByIds(
    reservationsStatesIds: string[],
  ): Promise<ReservationStateResponseDto[]> {
    return this.reservationsStatesService.findByIds(reservationsStatesIds);
  }

  @MessagePattern('reservationsStates.save')
  async save(
    @Payload() request: CreateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return this.reservationsStatesService.save(request);
  }

  @MessagePattern('reservationsStates.update')
  async update(
    @Payload() request: UpdateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return this.reservationsStatesService.update(request);
  }

  @MessagePattern('reservationsStates.remove')
  async remove(
    @Payload('reservationStateId') reservationStateId: string,
  ): Promise<DeleteResultResponse> {
    return this.reservationsStatesService.remove(reservationStateId);
  }
}
