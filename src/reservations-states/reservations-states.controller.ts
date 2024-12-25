import { ReservationsStatesService } from './reservations-states.service';
import { ReservationStateResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

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
}
