import { Injectable } from '@nestjs/common';
import { RatesRepository } from './repository/rate.repository';

@Injectable()
export class RatesService {
  constructor(private readonly ratesRepository: RatesRepository) {}
}
