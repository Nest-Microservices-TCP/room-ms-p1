import {
  In,
  Repository,
  QueryRunner,
  DeleteResult,
  UpdateResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  FailedRemoveException,
  FailedRestoreException,
  EntityNotFoundException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import { CreateAmenityRequest } from 'src/grpc/rooms/amenities.pb';

import { IAmenitiesRepository } from './interfaces/amenities.repository.interface';

import { Status } from 'src/common/enums';
import { Amenity } from '../entity/amenity.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

export class AmenitiesRepository implements IAmenitiesRepository {
  private amenitiesRepository: Repository<Amenity>;

  constructor(
    @InjectRepository(Amenity)
    private readonly defaultRepository: Repository<Amenity>,
  ) {
    this.amenitiesRepository = defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.amenitiesRepository = queryRunner.manager.getRepository(Amenity);
    } else {
      this.amenitiesRepository = this.defaultRepository;
    }
  }

  find(): Promise<Amenity[]> {
    return this.amenitiesRepository.find();
  }

  async findOne(amenity_id: string): Promise<Amenity> {
    const amenity = await this.amenitiesRepository.findOne({
      where: {
        amenity_id,
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

  save(request: CreateAmenityRequest): Promise<Amenity> {
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

  findByIds(amenities_ids: string[]): Promise<Amenity[]> {
    return this.amenitiesRepository.find({
      where: {
        amenity_id: In(amenities_ids),
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
