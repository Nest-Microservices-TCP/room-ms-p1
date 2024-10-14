import { Controller } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RateResponseDto } from './dto/response';
import { CreateRateDto, UpdateRateDto } from './dto/request';
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

  @MessagePattern({ cmd: 'save.rate' })
  save(@Payload() request: CreateRateDto): Promise<RateResponseDto> {
    return this.ratesService.save(request);
  }

  @MessagePattern({ cmd: 'update.rate' })
  update(@Payload() request: UpdateRateDto): Promise<RateResponseDto> {
    return this.ratesService.update(request);
  }

  @MessagePattern({ cmd: 'delete.rate.by.id' })
  deleteById(@Payload('rateId') rateId: string): Promise<RateResponseDto> {
    return this.ratesService.deleteById(rateId);
  }
}
