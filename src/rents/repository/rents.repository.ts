/* eslint-disable @typescript-eslint/no-unused-vars */
import { RentEntity } from '../entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentDto, UpdateRentDto } from '../dto/request';
import { IRentsRepository } from './interfaces/rents.repository.interface';
import { Status } from 'src/common/enums';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

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
