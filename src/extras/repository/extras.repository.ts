/* eslint-disable @typescript-eslint/no-unused-vars */
import { Status } from 'src/common/enums';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtraEntity } from '../entity/extra.entity';
import { CreateExtraDto, UpdateExtraDto } from '../dto/request';
import {
  EntityNotFoundException,
  FailedDeleteException,
} from 'src/common/exceptions/custom';
import { IExtrasRepository } from './interfaces/extras.repository.interface';

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
    return this.extrasRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(extraId: string): Promise<ExtraEntity> {
    const extra = await this.extrasRepository.findOne({
      where: {
        extraId,
      },
    });

    if (!extra) {
      throw new EntityNotFoundException('extra');
    }

    return extra;
  }

  create(request: Partial<ExtraEntity>): ExtraEntity {
    return this.extrasRepository.create(request);
  }

  save(request: CreateExtraDto): Promise<ExtraEntity> {
    return this.extrasRepository.save(request);
  }

  async update(request: UpdateExtraDto): Promise<ExtraEntity> {
    const { extraId } = request;

    const extra = await this.findOneById(extraId);

    Object.assign(extra, request);

    return this.save(extra);
  }

  async deleteById(extraId: string): Promise<ExtraEntity> {
    await this.findOneById(extraId);

    const result: UpdateResult = await this.extrasRepository.update(extraId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new FailedDeleteException('extra');
    }

    return this.findOneById(extraId);
  }
}
