import { Controller } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateReservationDto, UpdateReservationDto } from './dto/request';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @MessagePattern({ cmd: 'find.all.reservations' })
  async findAll(): Promise<ReservationResponseDto[]> {
    return this.reservationsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.reservation.by.id' })
  async findOneById(
    @Payload('reservationId') reservationId: string,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.findOneById(reservationId);
  }

  @MessagePattern({ cmd: 'save.reservation' })
  async save(
    @Payload() request: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.save(request);
  }

  @MessagePattern({ cmd: 'update.reservation' })
  async update(
    @Payload() request: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationsService.update(request);
  }
}
