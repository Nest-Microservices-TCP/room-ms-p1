import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { RatesService } from './rates.service';

import { RateResponseDto } from './dto/response';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @MessagePattern('rooms.find.all.rates')
  async findAll(): Promise<RateResponseDto[]> {
    return this.ratesService.findAll();
  }
}
