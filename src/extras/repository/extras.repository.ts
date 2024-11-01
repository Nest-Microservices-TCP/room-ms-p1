/* eslint-disable @typescript-eslint/no-unused-vars */
import { IExtrasRepository } from './interfaces/extras.repository.interface';
import { CreateExtraDto, UpdateExtraDto } from '../dto/request';
import { ExtraEntity } from '../entity/extra.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

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

  async remove(extraId: string): Promise<ExtraEntity> {
    await this.findOneById(extraId);

    const result: DeleteResult = await this.extrasRepository.delete(extraId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('extra');
    }

    return this.findOneById(extraId);
  }

  findByIds(extrasIds: string[]): Promise<ExtraEntity[]> {
    return this.extrasRepository.find({
      where: {
        extraId: In(extrasIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<ExtraEntity>,
  ): Promise<ExtraEntity> {
    return this.extrasRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<ExtraEntity[]> {
    return this.extrasRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<ExtraEntity>): Promise<number> {
    return this.extrasRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[ExtraEntity[], number]> {
    return this.extrasRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<ExtraEntity>): Promise<boolean> {
    const count = await this.extrasRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(extraId: string): Promise<ExtraEntity> {
    await this.findOneById(extraId);

    const result: UpdateResult = await this.extrasRepository.update(extraId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('extra');
    }

    return this.findOneById(extraId);
  }

  async restore(extraId: string): Promise<ExtraEntity> {
    await this.findOneById(extraId);

    const result: UpdateResult = await this.extrasRepository.update(extraId, {
      status: Status.ACTIVE,
      deletedAt: null,
    });

    if (result?.affected === 0) {
      throw new FailedRestoreException('extra');
    }

    return this.findOneById(extraId);
  }

  bulkSave(extras: ExtraEntity[]): Promise<ExtraEntity[]> {
    return this.extrasRepository.save(extras);
  }

  bulkUpdate(extras: ExtraEntity[]): Promise<ExtraEntity[]> {
    return this.extrasRepository.save(extras);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.extrasRepository.query(query, params);
  }
}
