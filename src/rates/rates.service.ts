import { Injectable } from '@nestjs/common';
import { RateResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { RatesRepository } from './repository/rates.repository';

@Injectable()
export class RatesService {
  constructor(private readonly ratesRepository: RatesRepository) {}

  @HandleRpcExceptions()
  async findAll(): Promise<RateResponseDto[]> {
    const rates = await this.ratesRepository.findAll();

    return plainToInstance(RateResponseDto, rates, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findOneById(rateId: string): Promise<RateResponseDto> {
    const rate = await this.ratesRepository.findOneById(rateId);

    return plainToInstance(RateResponseDto, rate, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async save(request: CreateRateDto): Promise<RateResponseDto> {
    const rate = await this.ratesRepository.save(request);

    return plainToInstance(RateResponseDto, rate, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async update(request: UpdateRateDto): Promise<RateResponseDto> {
    const rate = await this.ratesRepository.update(request);

    return plainToInstance(RateResponseDto, rate, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async deleteById(rateId: string): Promise<RateResponseDto> {
    const rate = await this.ratesRepository.deleteById(rateId);

    return plainToInstance(RateResponseDto, rate, {
      excludeExtraneousValues: true,
    });
  }
}
