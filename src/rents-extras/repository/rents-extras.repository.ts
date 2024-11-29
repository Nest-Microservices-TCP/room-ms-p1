/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteResultResponse } from 'src/common/dto/response';
import {
  QueryRunner,
  FindOptionsWhere,
  Repository,
  DeleteResult,
  In,
  UpdateResult,
} from 'typeorm';
import { CreateRentExtraDto, UpdateRentExtraDto } from '../dto/request';
import { RentExtraEntity } from '../entity/rent-extra.entity';
import { IRentsExtrasRepository } from './interfaces/rents-extras.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

export class RentsExtrasRepository implements IRentsExtrasRepository {
  private rentsExtrasRepository: Repository<RentExtraEntity>;

  constructor(
    @InjectRepository(RentExtraEntity)
    private readonly defaultRepository: Repository<RentExtraEntity>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.rentsExtrasRepository =
        queryRunner.manager.getRepository(RentExtraEntity);
    } else {
      this.rentsExtrasRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RentExtraEntity[]> {
    return this.rentsExtrasRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(rentExtraId: string): Promise<RentExtraEntity> {
    const rentExtra = await this.rentsExtrasRepository.findOne({
      where: { rentExtraId },
    });

    if (!rentExtra) {
      throw new EntityNotFoundException('rent-extra');
    }

    return rentExtra;
  }

  create(request: Partial<RentExtraEntity>): RentExtraEntity {
    return this.rentsExtrasRepository.create(request);
  }

  save(request: CreateRentExtraDto): Promise<RentExtraEntity> {
    return this.rentsExtrasRepository.save(request);
  }

  async update(request: UpdateRentExtraDto): Promise<RentExtraEntity> {
    const { rentExtraId } = request;

    const rentExtra = await this.findOneById(rentExtraId);

    Object.assign(rentExtra, request);

    return this.rentsExtrasRepository.save(rentExtra);
  }

  async remove(rentExtraId: string): Promise<DeleteResultResponse> {
    await this.findOneById(rentExtraId);

    const result: DeleteResult =
      await this.rentsExtrasRepository.delete(rentExtraId);

    if (result.affected === 0) {
      throw new FailedRemoveException('rent-extra');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(rentsExtrasIds: string[]): Promise<RentExtraEntity[]> {
    return this.rentsExtrasRepository.find({
      where: {
        rentExtraId: In(rentsExtrasIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<RentExtraEntity>,
  ): Promise<RentExtraEntity> {
    return this.rentsExtrasRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<RentExtraEntity[]> {
    return this.rentsExtrasRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RentExtraEntity>): Promise<number> {
    return this.rentsExtrasRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RentExtraEntity[], number]> {
    return this.rentsExtrasRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(rentExtraId: string): Promise<RentExtraEntity> {
    const rentExtra = await this.findOneById(rentExtraId);

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

  async restore(rentExtraId: string): Promise<RentExtraEntity> {
    const rentExtra = await this.findOneById(rentExtraId);

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

  async exists(criteria: FindOptionsWhere<RentExtraEntity>): Promise<boolean> {
    const count = await this.rentsExtrasRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(rentsExtras: RentExtraEntity[]): Promise<RentExtraEntity[]> {
    return this.rentsExtrasRepository.save(rentsExtras);
  }

  bulkUpdate(rentsExtras: RentExtraEntity[]): Promise<RentExtraEntity[]> {
    return this.rentsExtrasRepository.save(rentsExtras);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.rentsExtrasRepository.query(query, params);
  }
}
