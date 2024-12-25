import { ReservationsStatesService } from './reservations-states.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResultResponse } from 'src/common/dto/response';
import { ReservationStateResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';
import {
  CreateReservationStateDto,
  UpdateReservationStateDto,
} from './dto/request';

@Controller()
export class ReservationsStatesController {
  constructor(
    private readonly reservationsStatesService: ReservationsStatesService,
  ) {}

  @MessagePattern({ cmd: 'find.all.reservations.states' })
  findAll(): Promise<ReservationStateResponseDto[]> {
    return this.reservationsStatesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.reservation.state' })
  findOne(
    @Payload('reservationStateId') reservationStateId: string,
  ): Promise<ReservationStateResponseDto> {
    return this.reservationsStatesService.findOne(reservationStateId);
  }

  @MessagePattern({ cmd: 'find.reservations.states.by.ids' })
  findByIds(
    reservationsStatesIds: string[],
  ): Promise<ReservationStateResponseDto[]> {
    return this.reservationsStatesService.findByIds(reservationsStatesIds);
  }

  @MessagePattern({ cmd: 'save.reservation.state' })
  save(
    @Payload() request: CreateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return this.reservationsStatesService.save(request);
  }

  @MessagePattern({ cmd: 'update.reservation.state' })
  update(
    @Payload() request: UpdateReservationStateDto,
  ): Promise<ReservationStateResponseDto> {
    return this.reservationsStatesService.update(request);
  }

  @MessagePattern({ cmd: 'remove.reservation.state' })
  remove(
    @Payload('reservationStateId') reservationStateId: string,
  ): Promise<DeleteResultResponse> {
    return this.reservationsStatesService.remove(reservationStateId);
  }
}
