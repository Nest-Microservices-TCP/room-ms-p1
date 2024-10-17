/* eslint-disable @typescript-eslint/no-unused-vars */
import { RentEntity } from '../entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentDto, UpdateRentDto } from '../dto/request';
import { IRentsRepository } from './interfaces/rents.repository.interface';

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
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<RentEntity> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<RentEntity>): RentEntity {
    throw new Error('Method not implemented.');
  }
  save(request: CreateRentDto): Promise<RentEntity> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateRentDto): Promise<RentEntity> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<RentEntity> {
    throw new Error('Method not implemented.');
  }
}
