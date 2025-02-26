import { Injectable } from '@nestjs/common';

import { RatesRepository } from './repository/rates.repository';

import { HandleRpcExceptions } from 'src/common/decorators';

import { FindOneRateRequest } from 'src/grpc/rooms/rates/rates-request.pb';
import { Rate } from 'src/grpc/rooms/rates/rates-response.pb';

@Injectable()
export class RatesService {
  constructor(private readonly ratesRepository: RatesRepository) {}

  @HandleRpcExceptions()
  async findOne(request: FindOneRateRequest): Promise<Rate> {
    const { rate_id } = request;

    return await this.ratesRepository.findOne(rate_id);
  }
}
