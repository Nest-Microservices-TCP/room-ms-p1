import { IRentsRepository } from './interfaces/rents.repository.interface';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRentDto, UpdateRentDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import { RentEntity } from '../entity';
import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

export class RentsRepository implements IRentsRepository {
  private rentsRepository: Repository<RentEntity>;

  constructor(
    @InjectRepository(RentEntity)
    private readonly defaultRepository: Repository<RentEntity>,
  ) {
    this.rentsRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.rentsRepository = queryRunner.manager.getRepository(RentEntity);
    } else {
      this.rentsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RentEntity[]> {
    return this.rentsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(rentId: string): Promise<RentEntity> {
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

  create(request: Partial<RentEntity>): RentEntity {
    return this.rentsRepository.create(request);
  }

  save(request: CreateRentDto): Promise<RentEntity> {
    return this.rentsRepository.save(request);
  }

  async update(request: UpdateRentDto): Promise<RentEntity> {
    const { rentId } = request;

    const rent = await this.findOne(rentId);

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

  findByIds(rentsIds: string[]): Promise<RentEntity[]> {
    return this.rentsRepository.find({
      where: {
        rentId: In(rentsIds),
      },
    });
  }

  findByCriteria(criteria: FindOptionsWhere<RentEntity>): Promise<RentEntity> {
    return this.rentsRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<RentEntity[]> {
    return this.rentsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<RentEntity>): Promise<number> {
    return this.rentsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[RentEntity[], number]> {
    return this.rentsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async exists(criteria: FindOptionsWhere<RentEntity>): Promise<boolean> {
    const count = await this.rentsRepository.count({ where: criteria });

    return count > 0;
  }

  async softDelete(rentId: string): Promise<RentEntity> {
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

  async restore(rentId: string): Promise<RentEntity> {
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

  bulkSave(rents: RentEntity[]): Promise<RentEntity[]> {
    return this.rentsRepository.save(rents);
  }

  bulkUpdate(rents: RentEntity[]): Promise<RentEntity[]> {
    return this.rentsRepository.save(rents);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.rentsRepository.query(query, params);
  }
}
