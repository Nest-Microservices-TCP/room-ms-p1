import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RatesService } from './rates.service';

import { CreateRateDto, UpdateRateDto } from './dto/request';
import { RateResponseDto } from './dto/response';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @MessagePattern({ cmd: 'find.all.rates' })
  findAll(): Promise<RateResponseDto[]> {
    return this.ratesService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.rate' })
  findOne(@Payload('rateId') rateId: string): Promise<RateResponseDto> {
    return this.ratesService.findOne(rateId);
  }

  @MessagePattern({ cmd: 'find.rates.by.ids' })
  findByIds(@Payload() ratesIds: string[]): Promise<RateResponseDto[]> {
    return this.ratesService.findByIds(ratesIds);
  }

  @MessagePattern({ cmd: 'save.rate' })
  save(@Payload() request: CreateRateDto): Promise<RateResponseDto> {
    return this.ratesService.save(request);
  }

  @MessagePattern({ cmd: 'update.rate' })
  update(@Payload() request: UpdateRateDto): Promise<RateResponseDto> {
    return this.ratesService.update(request);
  }

  @MessagePattern({ cmd: 'remove.rate.by.id' })
  remove(@Payload('rateId') rateId: string): Promise<RateResponseDto> {
    return this.ratesService.remove(rateId);
  }
}
