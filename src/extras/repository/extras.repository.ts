/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner } from 'typeorm';
import { ExtraEntity } from '../entity/extra.entity';
import { CreateExtraDto, UpdateExtraDto } from '../dto/request';
import { IExtrasRepository } from './interfaces/extras.repository.interface';

export class ExtrasRepository implements IExtrasRepository {
  setQueryRunner(queryRunner: QueryRunner): void {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<ExtraEntity>): ExtraEntity {
    throw new Error('Method not implemented.');
  }
  save(request: CreateExtraDto): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateExtraDto): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
}
