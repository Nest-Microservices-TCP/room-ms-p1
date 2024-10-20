/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryRunner, Repository } from 'typeorm';
import { ExtraEntity } from '../entity/extra.entity';
import { CreateExtraDto, UpdateExtraDto } from '../dto/request';
import { IExtrasRepository } from './interfaces/extras.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class ExtrasRepository implements IExtrasRepository {
  private extrasRepository: Repository<ExtraEntity>;

  constructor(
    @InjectRepository(ExtraEntity)
    private readonly defaultRepository: Repository<ExtraEntity>,
  ) {
    this.extrasRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.extrasRepository = queryRunner.manager.getRepository(ExtraEntity);
    } else {
      this.extrasRepository = this.defaultRepository;
    }
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
