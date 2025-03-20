import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RentsService } from './rents.service';
import { CreateRentDto } from './dto/request';

@Controller()
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @MessagePattern('rents.save')
  async save(@Payload() request: CreateRentDto): Promise<void> {
    this.rentsService.save(request);
  }
}
