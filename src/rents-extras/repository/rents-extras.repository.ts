/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteResultResponse } from 'src/common/dto/response';
import {
  QueryRunner,
  FindOptionsWhere,
  Repository,
  DeleteResult,
} from 'typeorm';
import { CreateRentExtraDto, UpdateRentExtraDto } from '../dto/request';
import { RentExtraEntity } from '../entity/rent-extra.entity';
import { IRentsExtrasRepository } from './interfaces/rents-extras.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  EntityNotFoundException,
  FailedRemoveException,
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

  findByIds(ids: string[]): Promise<RentExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(
    criteria: FindOptionsWhere<RentExtraEntity>,
  ): Promise<RentExtraEntity> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<RentExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<RentExtraEntity>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[RentExtraEntity[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<RentExtraEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<RentExtraEntity> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<RentExtraEntity>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: RentExtraEntity[]): Promise<RentExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: RentExtraEntity[]): Promise<RentExtraEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
