import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { RatesRepository } from './repository/rates.repository';

import {
  GetRateRequest,
  ListRatesResponse,
  CreateRateRequest,
} from 'src/grpc/proto/rooms/rates.pb';

import { Rate } from './entity/rate.entity';

@Injectable()
export class RatesService {
  constructor(private readonly ratesRepository: RatesRepository) {}

  @HandleRpcExceptions()
  createRate(request: CreateRateRequest): void {
    this.ratesRepository.save(request);
  }

  @HandleRpcExceptions()
  async getRate(request: GetRateRequest): Promise<Rate> {
    const { rate_id } = request;

    return await this.ratesRepository.findOne(rate_id);
  }

  @HandleRpcExceptions()
  async listRates(): Promise<ListRatesResponse> {
    const rates = await this.ratesRepository.findAll();

    return { rates };
  }
}
