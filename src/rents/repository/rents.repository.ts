/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRentsRepository } from './interfaces/rents.repository.interface';
import { CreateRentDto, UpdateRentDto } from '../dto/request';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import { RentEntity } from '../entity';
import {
  Repository,
  QueryRunner,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  EntityNotFoundException,
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

  async findOneById(rentId: string): Promise<RentEntity> {
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

    const rent = await this.findOneById(rentId);

    Object.assign(rent, request);

    return this.rentsRepository.save(rent);
  }

  async remove(rentId: string): Promise<RentEntity> {
    await this.findOneById(rentId);

    const result: DeleteResult = await this.rentsRepository.delete(rentId);

    if (result.affected !== 0) {
      throw new FailedRemoveException('rent');
    }

    return this.findOneById(rentId);
  }

  findByIds(ids: string[]): Promise<RentEntity[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(criteria: FindOptionsWhere<RentEntity>): Promise<RentEntity> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<RentEntity[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<RentEntity>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[RentEntity[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<RentEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<RentEntity> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<RentEntity>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: RentEntity[]): Promise<RentEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: RentEntity[]): Promise<RentEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
