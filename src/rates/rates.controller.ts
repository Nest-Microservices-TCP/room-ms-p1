import { Controller } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RateResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @MessagePattern({ cmd: 'find.all.rates' })
  findAll(): Promise<RateResponseDto[]> {
    return this.ratesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.rate.by.id' })
  findOneById(@Payload('rateId') rateId: string): Promise<RateResponseDto> {
    return this.ratesService.findOneById(rateId);
  }
}
