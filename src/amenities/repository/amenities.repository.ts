/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteResultResponse } from 'src/common/dto/response';
import {
  QueryRunner,
  FindOptionsWhere,
  Repository,
  UpdateResult,
  DeleteResult,
  In,
} from 'typeorm';
import { CreateAmenityDto, UpdateAmenityDto } from '../dto/request';
import { AmenityEntity } from '../entity/amenity.entity';
import { IAmenitiesRepository } from './interfaces/amenities.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

export class AmenitiesRepository implements IAmenitiesRepository {
  private amenitiesRepository: Repository<AmenityEntity>;

  constructor(
    @InjectRepository(AmenityEntity)
    private readonly defaultRepository: Repository<AmenityEntity>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.amenitiesRepository =
        queryRunner.manager.getRepository(AmenityEntity);
    } else {
      this.amenitiesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<AmenityEntity[]> {
    return this.amenitiesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(amenityId: string): Promise<AmenityEntity> {
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

  create(request: Partial<AmenityEntity>): AmenityEntity {
    return this.amenitiesRepository.create(request);
  }

  save(request: CreateAmenityDto): Promise<AmenityEntity> {
    return this.amenitiesRepository.save(request);
  }

  async update(request: UpdateAmenityDto): Promise<AmenityEntity> {
    const { amenityId } = request;

    const amenity = await this.findOneById(amenityId);

    Object.assign(amenity, request);

    return this.amenitiesRepository.save(amenity);
  }

  async remove(amenityId: string): Promise<DeleteResultResponse> {
    await this.findOneById(amenityId);

    const result: DeleteResult =
      await this.amenitiesRepository.delete(amenityId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('amenity');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(amenitiesIds: string[]): Promise<AmenityEntity[]> {
    return this.amenitiesRepository.find({
      where: {
        amenityId: In(amenitiesIds),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<AmenityEntity>,
  ): Promise<AmenityEntity> {
    return this.amenitiesRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<AmenityEntity[]> {
    return this.amenitiesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<AmenityEntity>): Promise<number> {
    return this.amenitiesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[AmenityEntity[], number]> {
    return this.amenitiesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(amenityId: string): Promise<AmenityEntity> {
    await this.findOneById(amenityId);

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

    return this.findOneById(amenityId);
  }

  async restore(amenityId: string): Promise<AmenityEntity> {
    await this.findOneById(amenityId);

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

    return this.findOneById(amenityId);
  }

  exists(criteria: FindOptionsWhere<AmenityEntity>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: AmenityEntity[]): Promise<AmenityEntity[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: AmenityEntity[]): Promise<AmenityEntity[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
