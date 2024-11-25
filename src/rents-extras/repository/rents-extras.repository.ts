/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteResultResponse } from 'src/common/dto/response';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { CreateRentExtraDto, UpdateRentExtraDto } from '../dto/request';
import { RentExtraEntity } from '../entity/rent-extra.entity';
import { IRentsExtrasRepository } from './interfaces/rents-extras.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

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
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<RentExtraEntity> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<RentExtraEntity>): RentExtraEntity {
    throw new Error('Method not implemented.');
  }
  save(request: CreateRentExtraDto): Promise<RentExtraEntity> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateRentExtraDto): Promise<RentExtraEntity> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
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
