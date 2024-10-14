import { Status } from 'src/common/enums';
import { RoomEntity } from '../entity/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from '../dto/request';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { FailedDeleteException } from 'src/common/exceptions/custom';
import { IRoomsRepository } from './interfaces/rooms.repository.interface';
import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';

export class RoomsRepository implements IRoomsRepository {
  private roomsRepository: Repository<RoomEntity>;

  constructor(
    @InjectRepository(RoomEntity)
    private readonly defaultRepository: Repository<RoomEntity>,
  ) {
    this.roomsRepository = defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsRepository = queryRunner.manager.getRepository(RoomEntity);
    } else {
      this.roomsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<RoomEntity[]> {
    return this.roomsRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  async findOneById(roomId: string): Promise<RoomEntity> {
    const room = await this.roomsRepository.findOne({ where: { roomId } });

    if (!room) {
      throw new EntityNotFoundException('room');
    }

    return room;
  }

  create(request: Partial<RoomEntity>): RoomEntity {
    return this.roomsRepository.create(request);
  }

  async save(request: CreateRoomDto): Promise<RoomEntity> {
    const { number } = request;

    const room = await this.roomsRepository.findOne({ where: { number } });

    if (room) {
      throw new ConflictException(
        `Already exists a room with number: ${number}`,
      );
    }

    return this.roomsRepository.save(request);
  }

  async update(request: UpdateRoomDto): Promise<RoomEntity> {
    const { roomId } = request;

    const room = await this.findOneById(roomId);

    Object.assign(room, request);

    return this.roomsRepository.save(room);
  }

  async deleteById(roomId: string): Promise<RoomEntity> {
    await this.findOneById(roomId);

    const result: UpdateResult = await this.roomsRepository.update(roomId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result.affected === 0) {
      throw new FailedDeleteException('room');
    }

    return this.findOneById(roomId);
  }
}
