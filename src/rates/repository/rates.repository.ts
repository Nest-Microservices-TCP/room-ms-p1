/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRatesRepository } from './interfaces/rates.repository.interface';
import { CreateRateDto, UpdateRateDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from '../entity/rate.entity';
import { Status } from 'src/common/enums';
import {
  Repository,
  QueryRunner,
  DeleteResult,
  FindOptionsWhere,
  In,
} from 'typeorm';
import {
  FailedRemoveException,
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
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<RateEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<RateEntity> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<RateEntity>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: RateEntity[]): Promise<RateEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: RateEntity[]): Promise<RateEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
