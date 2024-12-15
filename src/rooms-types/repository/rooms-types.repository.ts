/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteResultResponse } from 'src/common/dto/response';
import {
  QueryRunner,
  FindOptionsWhere,
  Repository,
  DeleteResult,
  In,
} from 'typeorm';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from '../dto/request';
import { RoomType } from '../entity/room-type.entity';
import { IRoomsTypesRepository } from './interfaces/rooms-types.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundException,
  FailedRemoveException,
} from 'src/common/exceptions/custom';

export class RoomsTypesRepository implements IRoomsTypesRepository {
  private roomsTypesRepository: Repository<RoomType>;

  constructor(
    @InjectRepository(RoomType)
    private readonly defaultRepository: Repository<RoomType>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsTypesRepository = queryRunner.manager.getRepository(RoomType);
    } else {
      this.roomsTypesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RoomType[]> {
    return this.roomsTypesRepository.find();
  }

  async findOne(roomTypeId: string): Promise<RoomType> {
    const roomType = await this.roomsTypesRepository.findOne({
      where: { roomTypeId },
    });

    if (!roomType) {
      throw new EntityNotFoundException('room-type');
    }

    return roomType;
  }

  create(request: Partial<RoomType>): RoomType {
    return this.roomsTypesRepository.create(request);
  }

  save(request: CreateRoomTypeDto): Promise<RoomType> {
    return this.roomsTypesRepository.save(request);
  }

  async update(request: UpdateRoomTypeDto): Promise<RoomType> {
    const { roomTypeId } = request;

    const roomType = await this.findOne(roomTypeId);

    Object.assign(roomType, request);

    return this.roomsTypesRepository.save(roomType);
  }

  async remove(roomTypeId: string): Promise<DeleteResultResponse> {
    await this.findOne(roomTypeId);

    const result: DeleteResult =
      await this.roomsTypesRepository.delete(roomTypeId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('room-type');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(roomsTypesIds: string[]): Promise<RoomType[]> {
    return this.roomsTypesRepository.find({
      where: {
        roomTypeId: In(roomsTypesIds),
      },
    });
  }

  findByCriteria(criteria: FindOptionsWhere<RoomType>): Promise<RoomType> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: string[]): Promise<RoomType[]> {
    throw new Error('Method not implemented.');
  }
  count(criteria: FindOptionsWhere<RoomType>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  paginate(page: number, limit: number): Promise<[RoomType[], number]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<RoomType> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<RoomType> {
    throw new Error('Method not implemented.');
  }
  exists(criteria: FindOptionsWhere<RoomType>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: RoomType[]): Promise<RoomType[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: RoomType[]): Promise<RoomType[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
