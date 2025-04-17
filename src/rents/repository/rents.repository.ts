import {
  In,
  Repository,
  QueryRunner,
  UpdateResult,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import { IRentsRepository } from './interfaces/rents.repository.interface';

import { Rent } from '../entity';
import { Status } from 'src/common/enums';

import { SaveRentDto } from '../dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';

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

  async findOne(rent_id: string): Promise<Rent> {
    const rent = await this.rentsRepository.findOne({
      where: {
        rent_id,
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

  save(rent: SaveRentDto): Promise<Rent> {
    return this.rentsRepository.save(rent);
  }

  async update(
    conditions: FindOptionsWhere<Rent>,
    request: Partial<Rent>,
  ): Promise<Rent> {
    const rent = await this.findByCriteria(conditions);

    Object.assign(rent, request);

    return this.rentsRepository.save(rent);
  }

  async remove(rent_id: string): Promise<DeleteResultResponse> {
    await this.findOne(rent_id);

    const result: DeleteResult = await this.rentsRepository.delete(rent_id);

    if (result.affected === 0) {
      throw new FailedRemoveException('rent');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(rents_ids: string[]): Promise<Rent[]> {
    return this.rentsRepository.find({
      where: {
        rent_id: In(rents_ids),
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

  async softDelete(rent_id: string): Promise<Rent> {
    await this.findOne(rent_id);

    const result: UpdateResult = await this.rentsRepository.update(rent_id, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('rent');
    }

    return this.findOne(rent_id);
  }

  async restore(rent_id: string): Promise<Rent> {
    await this.findOne(rent_id);

    const result: UpdateResult = await this.rentsRepository.update(rent_id, {
      status: Status.ACTIVE,
      deletedAt: null,
    });

    if (result?.affected === 0) {
      throw new FailedRestoreException('rent');
    }

    return this.findOne(rent_id);
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
