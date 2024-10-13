/* eslint-disable @typescript-eslint/no-unused-vars */
import { Status } from 'src/common/enums';
import { RateEntity } from '../entity/rate.entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRateDto, UpdateRateDto } from '../dto/request';
import { IRatesRepository } from './interfaces/rate.repository.interface';

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

  findOneById(id: string): Promise<RateEntity> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<RateEntity>): RateEntity {
    throw new Error('Method not implemented.');
  }
  save(request: CreateRateDto): Promise<RateEntity> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateRateDto): Promise<RateEntity> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<RateEntity> {
    throw new Error('Method not implemented.');
  }
}
