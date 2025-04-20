import { In, Repository } from 'typeorm';
import { RateExtra } from '../entity/rate-extra.entity';

export class RatesExtrasRepository extends Repository<RateExtra> {
  async findByRate(request: {
    rate_id: string;
    extras_ids: string[];
  }): Promise<RateExtra[]> {
    const { rate_id, extras_ids } = request;

    return super.find({
      where: {
        rate: { rate_id },
        extra: { extra_id: In(extras_ids) },
      },
    });
  }
}
