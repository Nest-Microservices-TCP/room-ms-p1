import { HandleRpcExceptions } from 'src/common/decorators';
import { RatesExtrasRepository } from './repository/rates-extras.repository';
import { RateExtra } from './entity/rate-extra.entity';

export class RatesExtrasService {
  constructor(private readonly ratesExtrasRepository: RatesExtrasRepository) {}

  @HandleRpcExceptions()
  async findOne(request: { rate_extra_id: string }) {
    const { rate_extra_id } = request;

    return this.ratesExtrasRepository.findOne({
      where: { rate_extra_id },
    });
  }

  @HandleRpcExceptions()
  async findByRate(request: {
    rate_id: string;
    extras_ids: string[];
  }): Promise<RateExtra[]> {
    return this.ratesExtrasRepository.findByRate(request);
  }
}
