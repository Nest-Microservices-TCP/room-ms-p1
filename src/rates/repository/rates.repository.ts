import { IRatesRepository } from './interfaces/rates.repository.interface';
import { CreateRateDto, UpdateRateDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from '../entity/rate.entity';
import { Status } from 'src/common/enums';
import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
} from 'src/common/exceptions/custom';

export class RatesRepository implements IRatesRepository {
  private ratesRepository: Repository<RateEntity>;

  constructor(
    @InjectRepository(RateEntity)
    private readonly defaultRepository: Repository<RateEntity>,
  ) {
    this.ratesRepository = defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.ratesRepository = queryRunner.manager.getRepository(RateEntity);
    } else {
      this.ratesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RateEntity[]> {
    return this.ratesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(rateId: string): Promise<RateEntity> {
    const rate = await this.ratesRepository.findOne({
      where: {
        rateId,
      },
    });

    if (!rate) {
      throw new EntityNotFoundException('rate');
    }

    return rate;
  }

  create(request: Partial<RateEntity>): RateEntity {
    return this.ratesRepository.create(request);
  }

  save(request: CreateRateDto): Promise<RateEntity> {
    return this.ratesRepository.save(request);
  }

  async update(request: UpdateRateDto): Promise<RateEntity> {
    const { rateId } = request;

    const rate = await this.findOneById(rateId);

    Object.assign(rate, request);

    return this.ratesRepository.save(rate);
  }

  async remove(rateId: string): Promise<RateEntity> {
    const rate = await this.findOneById(rateId);

    const result: DeleteResult = await this.ratesRepository.delete(rateId);

    if (result.affected !== 1) {
      throw new FailedRemoveException('rate');
    }

    return rate;
  }

  findByIds(ratesIds: string[]): Promise<RateEntity[]> {
    return this.ratesRepository.find({
      where: {
        rateId: In(ratesIds),
      },
    });
  }

  findByCriteria(criteria: FindOptionsWhere<RateEntity>): Promise<RateEntity> {
    return this.ratesRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<RateEntity[]> {
    return this.ratesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RateEntity>): Promise<number> {
    return this.ratesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RateEntity[], number]> {
    return this.ratesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<RateEntity>): Promise<boolean> {
    const count = await this.ratesRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(rateId: string): Promise<RateEntity> {
    await this.findOneById(rateId);

    const result: UpdateResult = await this.ratesRepository.update(rateId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new EntityNotFoundException('rate');
    }

    return this.findOneById(rateId);
  }

  async restore(rateId: string): Promise<RateEntity> {
    await this.findOneById(rateId);

    const result: UpdateResult = await this.ratesRepository.update(rateId, {
      status: Status.ACTIVE,
      deletedAt: null,
    });

    if (result?.affected === 0) {
      throw new FailedRestoreException('rate');
    }

    return this.findOneById(rateId);
  }

  bulkSave(rates: RateEntity[]): Promise<RateEntity[]> {
    return this.ratesRepository.save(rates);
  }

  bulkUpdate(rates: RateEntity[]): Promise<RateEntity[]> {
    return this.ratesRepository.save(rates);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.ratesRepository.query(query, params);
  }
}
