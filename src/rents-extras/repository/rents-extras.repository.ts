import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';
import {
  DeleteResult,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';

import { IRentsExtrasRepository } from './interfaces/rents-extras.repository.interface';

import { Status } from 'src/common/enums';
import { RentExtra } from '../entity/rent-extra.entity';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRentExtraDto } from '../dto/request';

export class RentsExtrasRepository implements IRentsExtrasRepository {
  private rentsExtrasRepository: Repository<RentExtra>;

  constructor(
    @InjectRepository(RentExtra)
    private readonly defaultRepository: Repository<RentExtra>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.rentsExtrasRepository = queryRunner.manager.getRepository(RentExtra);
    } else {
      this.rentsExtrasRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RentExtra[]> {
    return this.rentsExtrasRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(rentExtraId: string): Promise<RentExtra> {
    const rentExtra = await this.rentsExtrasRepository.findOne({
      where: { rentExtraId },
    });

    if (!rentExtra) {
      throw new EntityNotFoundException('rent-extra');
    }

    return rentExtra;
  }

  create(request: Partial<RentExtra>): RentExtra {
    return this.rentsExtrasRepository.create(request);
  }

  save(request: CreateRentExtraDto): Promise<RentExtra> {
    return this.rentsExtrasRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<RentExtra>,
    request: Partial<RentExtra>,
  ): Promise<RentExtra> {
    const rentExtra = await this.findByCriteria(conditions);

    Object.assign(rentExtra, request);

    return this.rentsExtrasRepository.save(rentExtra);
  }

  async remove(rentExtraId: string): Promise<DeleteResultResponse> {
    await this.findOne(rentExtraId);

    const result: DeleteResult =
      await this.rentsExtrasRepository.delete(rentExtraId);

    if (result.affected === 0) {
      throw new FailedRemoveException('rent-extra');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(rentsExtrasIds: string[]): Promise<RentExtra[]> {
    return this.rentsExtrasRepository.find({
      where: {
        rentExtraId: In(rentsExtrasIds),
      },
    });
  }

  async findByCriteria(
    criteria: FindOptionsWhere<RentExtra>,
  ): Promise<RentExtra> {
    const rentExtra = await this.rentsExtrasRepository.findOne({
      where: criteria,
    });

    if (!rentExtra) {
      throw new EntityNotFoundException('rent-extra');
    }

    return rentExtra;
  }

  findWithRelations(relations: string[]): Promise<RentExtra[]> {
    return this.rentsExtrasRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RentExtra>): Promise<number> {
    return this.rentsExtrasRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RentExtra[], number]> {
    return this.rentsExtrasRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(rentExtraId: string): Promise<RentExtra> {
    const rentExtra = await this.findOne(rentExtraId);

    const result: UpdateResult = await this.rentsExtrasRepository.update(
      rentExtraId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('rent-extra');
    }

    return rentExtra;
  }

  async restore(rentExtraId: string): Promise<RentExtra> {
    const rentExtra = await this.findOne(rentExtraId);

    const result: UpdateResult = await this.rentsExtrasRepository.update(
      rentExtraId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('ren-extra');
    }

    return rentExtra;
  }

  async exists(criteria: FindOptionsWhere<RentExtra>): Promise<boolean> {
    const count = await this.rentsExtrasRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(rentsExtras: RentExtra[]): Promise<RentExtra[]> {
    return this.rentsExtrasRepository.save(rentsExtras);
  }

  bulkUpdate(rentsExtras: RentExtra[]): Promise<RentExtra[]> {
    return this.rentsExtrasRepository.save(rentsExtras);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.rentsExtrasRepository.query(query, params);
  }
}
