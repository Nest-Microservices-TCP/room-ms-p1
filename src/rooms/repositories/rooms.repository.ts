import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from '../dto';
import { RoomEntity } from '../entities/room.entity';
import { IRoomsRepository } from './interfaces/rooms.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Status } from 'src/common';

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

  async findOneById(id: string): Promise<RoomEntity> {
    const room = await this.roomsRepository.findOne({ where: { id } });

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

  async deleteById(id: string): Promise<RoomEntity> {
    const { id: roomId } = await this.findOneById(id);

    const result: UpdateResult = await this.roomsRepository.update(roomId, {
      status: Status.DELETED,
      deletedAt: new Date(),
    });

    if (result.affected === 0) {
      throw new InternalServerErrorException(
        `Error to delete the room, try again`,
      );
    }

    return this.findOneById(roomId);
  }
}
