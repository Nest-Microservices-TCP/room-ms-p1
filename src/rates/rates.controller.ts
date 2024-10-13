import { Controller } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RateResponseDto } from './dto/response';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @MessagePattern({ cmd: 'find.all.rates' })
  findAll(): Promise<RateResponseDto[]> {
    return this.ratesService.findAll();
  }
}
