import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RatesRepository } from './repository/rates.repository';

import { HandleRpcExceptions } from 'src/common/decorators';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { RateResponseDto } from './dto/response';

@Injectable()
export class RatesService {
  constructor(private readonly ratesRepository: RatesRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(RateResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<RateResponseDto[]> {
    const rates = await this.ratesRepository.findAll();

    return this.plainToInstanceDto(rates);
  }

  @HandleRpcExceptions()
  async findOne(rateId: string): Promise<RateResponseDto> {
    const rate = await this.ratesRepository.findOne(rateId);

    return this.plainToInstanceDto(rate);
  }

  @HandleRpcExceptions()
  async findByIds(ratesIds: string[]): Promise<RateResponseDto[]> {
    const rates = await this.ratesRepository.findByIds(ratesIds);

    return this.plainToInstanceDto(rates);
  }

  @HandleRpcExceptions()
  async save(request: CreateRateDto): Promise<RateResponseDto> {
    const newRate = await this.ratesRepository.save(request);

    return this.plainToInstanceDto(newRate);
  }

  @HandleRpcExceptions()
  async update(request: UpdateRateDto): Promise<RateResponseDto> {
    const { rateId, ...rest } = request;

    const updatedRate = await this.ratesRepository.update({ rateId }, rest);

    return this.plainToInstanceDto(updatedRate);
  }

  @HandleRpcExceptions()
  async remove(rateId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.ratesRepository.remove(rateId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }
}
