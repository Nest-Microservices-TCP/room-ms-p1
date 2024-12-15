/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteResultResponse } from 'src/common/dto/response';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from '../dto/request';
import { RoomType } from '../entity/room-type.entity';
import { IRoomsTypesRepository } from './interfaces/rooms-types.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

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
    throw new Error('Method not implemented.');
  }
  save(request: CreateRoomTypeDto): Promise<RoomType> {
    throw new Error('Method not implemented.');
  }
  update(request: UpdateRoomTypeDto): Promise<RoomType> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
  findByIds(ids: string[]): Promise<RoomType[]> {
    throw new Error('Method not implemented.');
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
