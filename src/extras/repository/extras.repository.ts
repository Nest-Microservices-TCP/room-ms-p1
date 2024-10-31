/* eslint-disable @typescript-eslint/no-unused-vars */
import { IExtrasRepository } from './interfaces/extras.repository.interface';
import { CreateExtraDto, UpdateExtraDto } from '../dto/request';
import { ExtraEntity } from '../entity/extra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  Repository,
  QueryRunner,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  EntityNotFoundException,
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

  async deleteById(extraId: string): Promise<ExtraEntity> {
    await this.findOneById(extraId);

    const result: UpdateResult = await this.extrasRepository.update(extraId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new FailedRemoveException('extra');
    }

    return this.findOneById(extraId);
  }

  remove(id: string): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
  findByIds(ids: string[]): Promise<ExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(
    criteria: FindOptionsWhere<ExtraEntity>,
  ): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<ExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<ExtraEntity>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[ExtraEntity[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<ExtraEntity> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<ExtraEntity>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: ExtraEntity[]): Promise<ExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: ExtraEntity[]): Promise<ExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
