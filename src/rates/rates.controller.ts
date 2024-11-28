import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { RateResponseDto } from './dto/response';
import { RatesService } from './rates.service';
import { Controller } from '@nestjs/common';

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
