/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FailedDeleteException,
  EntityNotFoundException,
} from 'src/common/exceptions/custom';
import { RentEntity } from '../entity';
import { Status } from 'src/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentDto, UpdateRentDto } from '../dto/request';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
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

  async deleteById(rentId: string): Promise<RentEntity> {
    await this.findOneById(rentId);

    const result: UpdateResult = await this.rentsRepository.update(rentId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result.affected !== 0) {
      throw new FailedDeleteException('rent');
    }

    return this.findOneById(rentId);
  }
}
