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

import { Status } from 'src/common/enums';

import { Amenity } from '../entity/amenity.entity';
import { IAmenitiesRepository } from './interfaces/amenities.repository.interface';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateAmenityDto } from '../dto/request';

export class AmenitiesRepository implements IAmenitiesRepository {
  private amenitiesRepository: Repository<Amenity>;

  constructor(
    @InjectRepository(Amenity)
    private readonly defaultRepository: Repository<Amenity>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.amenitiesRepository = queryRunner.manager.getRepository(Amenity);
    } else {
      this.amenitiesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<Amenity[]> {
    return this.amenitiesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOne(amenityId: string): Promise<Amenity> {
    const amenity = await this.amenitiesRepository.findOne({
      where: {
        amenityId,
      },
    });

    if (!amenity) {
      throw new EntityNotFoundException('amenity');
    }

    return amenity;
  }

  create(request: Partial<Amenity>): Amenity {
    return this.amenitiesRepository.create(request);
  }

  save(request: CreateAmenityDto): Promise<Amenity> {
    return this.amenitiesRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<Amenity>,
    request: Partial<Amenity>,
  ) {
    const amenity = await this.findByCriteria(conditions);

    Object.assign(amenity, request);

    return this.amenitiesRepository.save(amenity);
  }

  async remove(amenityId: string): Promise<DeleteResultResponse> {
    await this.findOne(amenityId);

    const result: DeleteResult =
      await this.amenitiesRepository.delete(amenityId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('amenity');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(amenitiesIds: string[]): Promise<Amenity[]> {
    return this.amenitiesRepository.find({
      where: {
        amenityId: In(amenitiesIds),
      },
    });
  }

  async findByCriteria(criteria: FindOptionsWhere<Amenity>): Promise<Amenity> {
    const amenity = this.amenitiesRepository.findOne({ where: criteria });

    if (!amenity) {
      throw new EntityNotFoundException('amenity');
    }

    return amenity;
  }

  findWithRelations(relations: string[]): Promise<Amenity[]> {
    return this.amenitiesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Amenity>): Promise<number> {
    return this.amenitiesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Amenity[], number]> {
    return this.amenitiesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(amenityId: string): Promise<Amenity> {
    await this.findOne(amenityId);

    const result: UpdateResult = await this.amenitiesRepository.update(
      amenityId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('amenity');
    }

    return this.findOne(amenityId);
  }

  async restore(amenityId: string): Promise<Amenity> {
    await this.findOne(amenityId);

    const result: UpdateResult = await this.amenitiesRepository.update(
      amenityId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('amenity');
    }

    return this.findOne(amenityId);
  }

  async exists(criteria: FindOptionsWhere<Amenity>): Promise<boolean> {
    const count = await this.count(criteria);

    return count > 0;
  }

  bulkSave(amenities: Amenity[]): Promise<Amenity[]> {
    return this.amenitiesRepository.save(amenities);
  }

  bulkUpdate(amenities: Amenity[]): Promise<Amenity[]> {
    return this.amenitiesRepository.save(amenities);
  }

  customQuery(query: string, params: any[]): Promise<any> {
    return this.amenitiesRepository.query(query, params);
  }
}
