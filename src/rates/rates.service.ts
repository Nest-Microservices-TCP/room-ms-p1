import { RatesRepository } from './repository/rates.repository';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { RateResponseDto } from './dto/response';
import { Injectable } from '@nestjs/common';

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
    const updatedRate = await this.ratesRepository.update(request);

    return this.plainToInstanceDto(updatedRate);
  }

  @HandleRpcExceptions()
  async remove(rateId: string): Promise<RateResponseDto> {
    const rate = await this.ratesRepository.remove(rateId);

    return plainToInstance(RateResponseDto, rate, {
      excludeExtraneousValues: true,
    });
  }
}
