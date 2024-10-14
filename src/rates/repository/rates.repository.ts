/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FailedDeleteException,
  EntityNotFoundException,
} from 'src/common/exceptions/custom';
import { Status } from 'src/common/enums';
import { RateEntity } from '../entity/rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRateDto, UpdateRateDto } from '../dto/request';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { IRatesRepository } from './interfaces/rates.repository.interface';

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

  async deleteById(rateId: string): Promise<RateEntity> {
    await this.findOneById(rateId);

    const result: UpdateResult = await this.ratesRepository.update(rateId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result.affected !== 1) {
      throw new FailedDeleteException('rate');
    }

    return this.findOneById(rateId);
  }
}
