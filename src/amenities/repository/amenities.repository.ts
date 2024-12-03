/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteResultResponse } from 'src/common/dto/response';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { CreateAmenityDto, UpdateAmenityDto } from '../dto/request';
import { AmenityEntity } from '../entity/amenity.entity';
import { IAmenitiesRepository } from './interfaces/amenities.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enums';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

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

  update(request: UpdateAmenityDto): Promise<AmenityEntity> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
  findByIds(ids: string[]): Promise<AmenityEntity[]> {
    throw new Error('Method not implemented.');
  }
  findByCriteria(
    criteria: FindOptionsWhere<AmenityEntity>,
  ): Promise<AmenityEntity> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<AmenityEntity[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<AmenityEntity>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[AmenityEntity[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<AmenityEntity> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<AmenityEntity> {
    throw new Error('Method not implemented.');
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
