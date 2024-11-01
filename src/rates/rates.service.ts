import { RatesRepository } from './repository/rates.repository';
import { CreateRateDto, UpdateRateDto } from './dto/request';
import { HandleRpcExceptions } from 'src/common/decorators';
import { plainToInstance } from 'class-transformer';
import { RateResponseDto } from './dto/response';
import { Injectable } from '@nestjs/common';

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
  async remove(rateId: string): Promise<RateResponseDto> {
    const rate = await this.ratesRepository.remove(rateId);

    return plainToInstance(RateResponseDto, rate, {
      excludeExtraneousValues: true,
    });
  }
}
