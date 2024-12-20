import { IRatesRepository } from './interfaces/rates.repository.interface';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRateDto, UpdateRateDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from '../entity/rate.entity';
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
  private ratesRepository: Repository<Rate>;

  constructor(
    @InjectRepository(Rate)
    private readonly defaultRepository: Repository<Rate>,
  ) {
    this.ratesRepository = defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.ratesRepository = queryRunner.manager.getRepository(Rate);
    } else {
      this.ratesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<Rate[]> {
    return this.ratesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(rateId: string): Promise<Rate> {
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

  create(request: Partial<Rate>): Rate {
    return this.ratesRepository.create(request);
  }

  save(request: CreateRateDto): Promise<Rate> {
    return this.ratesRepository.save(request);
  }

  async update(request: UpdateRateDto): Promise<Rate> {
    const { rateId } = request;

    const rate = await this.findOne(rateId);

    Object.assign(rate, request);

    return this.ratesRepository.save(rate);
  }

  async remove(rateId: string): Promise<DeleteResultResponse> {
    await this.findOne(rateId);

    const result: DeleteResult = await this.ratesRepository.delete(rateId);

    if (result.affected === 0) {
      throw new FailedRemoveException('rate');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(ratesIds: string[]): Promise<Rate[]> {
    return this.ratesRepository.find({
      where: {
        rateId: In(ratesIds),
      },
    });
  }

  findByCriteria(criteria: FindOptionsWhere<Rate>): Promise<Rate> {
    return this.ratesRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<Rate[]> {
    return this.ratesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Rate>): Promise<number> {
    return this.ratesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Rate[], number]> {
    return this.ratesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<Rate>): Promise<boolean> {
    const count = await this.ratesRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(rateId: string): Promise<Rate> {
    await this.findOne(rateId);

    const result: UpdateResult = await this.ratesRepository.update(rateId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new EntityNotFoundException('rate');
    }

    return this.findOne(rateId);
  }

  async restore(rateId: string): Promise<Rate> {
    await this.findOne(rateId);

    const result: UpdateResult = await this.ratesRepository.update(rateId, {
      status: Status.ACTIVE,
      deletedAt: null,
    });

    if (result?.affected === 0) {
      throw new FailedRestoreException('rate');
    }

    return this.findOne(rateId);
  }

  bulkSave(rates: Rate[]): Promise<Rate[]> {
    return this.ratesRepository.save(rates);
  }

  bulkUpdate(rates: Rate[]): Promise<Rate[]> {
    return this.ratesRepository.save(rates);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.ratesRepository.query(query, params);
  }
}
