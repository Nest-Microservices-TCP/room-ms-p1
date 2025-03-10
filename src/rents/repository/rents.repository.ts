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

import { IRentsRepository } from './interfaces/rents.repository.interface';

import { DeleteResultResponse } from 'src/common/dto/response';
// import { CreateRentDto } from '../dto/request';

import { Status } from 'src/common/enums';
import { Rent } from '../entity';
import { NotImplementedException } from '@nestjs/common';

export class RentsRepository implements IRentsRepository {
  private rentsRepository: Repository<Rent>;

  constructor(
    @InjectRepository(Rent)
    private readonly defaultRepository: Repository<Rent>,
  ) {
    this.rentsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.rentsRepository = queryRunner.manager.getRepository(Rent);
    } else {
      this.rentsRepository = this.defaultRepository;
    }
  }

  find(): Promise<Rent[]> {
    return this.rentsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(rentId: string): Promise<Rent> {
    const rent = await this.rentsRepository.findOne({
      where: {
        rentId,
      },
    });

    if (!rent) {
      throw new EntityNotFoundException('rent');
    }

    return rent;
  }

  create(request: Partial<Rent>): Rent {
    return this.rentsRepository.create(request);
  }

  save(): Promise<Rent> {
    // return this.rentsRepository.save(request);
    throw new NotImplementedException();
  }

  async update(
    conditions: FindOptionsWhere<Rent>,
    request: Partial<Rent>,
  ): Promise<Rent> {
    const rent = await this.findByCriteria(conditions);

    Object.assign(rent, request);

    return this.rentsRepository.save(rent);
  }

  async remove(rentId: string): Promise<DeleteResultResponse> {
    await this.findOne(rentId);

    const result: DeleteResult = await this.rentsRepository.delete(rentId);

    if (result.affected === 0) {
      throw new FailedRemoveException('rent');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(rentsIds: string[]): Promise<Rent[]> {
    return this.rentsRepository.find({
      where: {
        rentId: In(rentsIds),
      },
    });
  }

  async findByCriteria(criteria: FindOptionsWhere<Rent>): Promise<Rent> {
    const rent = await this.rentsRepository.findOne({ where: criteria });

    if (!rent) {
      throw new EntityNotFoundException('rent');
    }

    return rent;
  }

  findWithRelations(relations: string[]): Promise<Rent[]> {
    return this.rentsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Rent>): Promise<number> {
    return this.rentsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Rent[], number]> {
    return this.rentsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<Rent>): Promise<boolean> {
    const count = await this.rentsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(rentId: string): Promise<Rent> {
    await this.findOne(rentId);

    const result: UpdateResult = await this.rentsRepository.update(rentId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('rent');
    }

    return this.findOne(rentId);
  }

  async restore(rentId: string): Promise<Rent> {
    await this.findOne(rentId);

    const result: UpdateResult = await this.rentsRepository.update(rentId, {
      status: Status.ACTIVE,
      deletedAt: null,
    });

    if (result?.affected === 0) {
      throw new FailedRestoreException('rent');
    }

    return this.findOne(rentId);
  }

  bulkSave(rents: Rent[]): Promise<Rent[]> {
    return this.rentsRepository.save(rents);
  }

  bulkUpdate(rents: Rent[]): Promise<Rent[]> {
    return this.rentsRepository.save(rents);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.rentsRepository.query(query, params);
  }
}
