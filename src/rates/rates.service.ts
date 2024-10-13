import { Injectable } from '@nestjs/common';
import { RateResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';
import { RatesRepository } from './repository/rate.repository';

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
}
