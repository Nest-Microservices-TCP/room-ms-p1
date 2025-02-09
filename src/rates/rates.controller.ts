import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

import { RatesService } from './rates.service';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { RateResponseDto } from './dto/response';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @MessagePattern('rooms.find.all.rates')
  async findAll(): Promise<RateResponseDto[]> {
    return this.ratesService.findAll();
  }

  @MessagePattern('rooms.find.one.rate')
  async findOne(@Payload('rateId') rateId: string): Promise<any> {
    //TODO: Se esta serializando mal el dto, hay que revisar que esta fallando
    const rate = await this.ratesService.findOne(rateId);

    return JSON.stringify(
      plainToInstance(RateResponseDto, rate, { excludeExtraneousValues: true }),
    );
  }

  @MessagePattern('rooms.save.rate')
  async save(@Payload() request: CreateRateDto): Promise<RateResponseDto> {
    return this.ratesService.save(request);
  }

  @MessagePattern('rooms.update.rate')
  async update(@Payload() request: UpdateRateDto): Promise<RateResponseDto> {
    return this.ratesService.update(request);
  }

  @MessagePattern('rooms.remove.rate')
  async remove(
    @Payload('rateId') rateId: string,
  ): Promise<DeleteResultResponse> {
    return this.ratesService.remove(rateId);
  }
}
