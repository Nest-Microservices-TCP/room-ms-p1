import { Controller } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationResponseDto } from './dto/response';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @MessagePattern({ cmd: 'find.all.reservations' })
  async findAll(): Promise<ReservationResponseDto[]> {
    return this.reservationsService.findAll();
  }
}
