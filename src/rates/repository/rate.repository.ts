/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner } from 'typeorm';
import { CreateRateDto, UpdateRateDto } from '../dto/request';
import { RateEntity } from '../entity/rate.entity';
import { IRatesRepository } from './interfaces/rate.repository.interface';

export class RatesRepository implements IRatesRepository {
  setQueryRunner(queryRunner: QueryRunner): void {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<RateEntity[]> {
    throw new Error('Method not implemented.');
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
