import { InjectRepository } from '@nestjs/typeorm';
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

import { CreateExtraRequest } from 'src/grpc/proto/rooms/extras.pb';

import { IExtrasRepository } from './interfaces/extras.repository.interface';

import { Extra } from '../entity/extra.entity';
import { Status } from 'src/common/enums';

import { DeleteResultResponse } from 'src/common/dto/response';

export class ExtrasRepository implements IExtrasRepository {
  private extrasRepository: Repository<Extra>;

  constructor(
    @InjectRepository(Extra)
    private readonly defaultRepository: Repository<Extra>,
  ) {
    this.extrasRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.extrasRepository = queryRunner.manager.getRepository(Extra);
    } else {
      this.extrasRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<Extra[]> {
    return this.extrasRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(extra_id: string): Promise<Extra> {
    const extra = await this.extrasRepository.findOne({
      where: {
        extra_id,
      },
    });

    if (!extra) {
      throw new EntityNotFoundException('extra');
    }

    return extra;
  }

  create(request: Partial<Extra>): Extra {
    return this.extrasRepository.create(request);
  }

  save(request: CreateExtraRequest): Promise<Extra> {
    return this.extrasRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<Extra>,
    request: Partial<Extra>,
  ): Promise<Extra> {
    const extra = await this.findByCriteria(conditions);

    Object.assign(extra, request);

    return this.save(extra);
  }

  async remove(extraId: string): Promise<DeleteResultResponse> {
    await this.findOne(extraId);

    const result: DeleteResult = await this.extrasRepository.delete(extraId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('extra');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(extras_ids: string[]): Promise<Extra[]> {
    return this.extrasRepository.find({
      where: {
        extra_id: In(extras_ids),
      },
    });
  }

  async findByCriteria(criteria: FindOptionsWhere<Extra>): Promise<Extra> {
    const extra = this.extrasRepository.findOne({ where: criteria });

    if (!extra) {
      throw new EntityNotFoundException('extra');
    }

    return extra;
  }

  findWithRelations(relations: string[]): Promise<Extra[]> {
    return this.extrasRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Extra>): Promise<number> {
    return this.extrasRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Extra[], number]> {
    return this.extrasRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<Extra>): Promise<boolean> {
    const count = await this.extrasRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(extraId: string): Promise<Extra> {
    await this.findOne(extraId);

    const result: UpdateResult = await this.extrasRepository.update(extraId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('extra');
    }

    return this.findOne(extraId);
  }

  async restore(extraId: string): Promise<Extra> {
    await this.findOne(extraId);

    const result: UpdateResult = await this.extrasRepository.update(extraId, {
      status: Status.ACTIVE,
      deletedAt: null,
    });

    if (result?.affected === 0) {
      throw new FailedRestoreException('extra');
    }

    return this.findOne(extraId);
  }

  bulkSave(extras: Extra[]): Promise<Extra[]> {
    return this.extrasRepository.save(extras);
  }

  bulkUpdate(extras: Extra[]): Promise<Extra[]> {
    return this.extrasRepository.save(extras);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.extrasRepository.query(query, params);
  }
}
