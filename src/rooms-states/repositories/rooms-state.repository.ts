import { InjectRepository } from '@nestjs/typeorm';
import { RoomStateEntity } from '../entities/room-state.entity';
import { IRoomsStateRepository } from './interfaces/rooms-state.repository.interface';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryRunner, Repository, UpdateResult } from 'typeorm';
import { CreateRoomStateDto } from '../dto/create-room-state.dto';
import { UpdateRoomStateDto } from '../dto';
import { EntityNotFoundException } from 'src/common/exceptions/custom/entity-not-found.exception';
import { Status } from 'src/common';

@Injectable()
export class RoomsStatesRepository implements IRoomsStateRepository {
  private roomsStatesRepository: Repository<RoomStateEntity>;

  constructor(
    @InjectRepository(RoomStateEntity)
    private readonly defaultRepository: Repository<RoomStateEntity>,
  ) {
    this.roomsStatesRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.roomsStatesRepository =
        queryRunner.manager.getRepository(RoomStateEntity);
    } else {
      this.roomsStatesRepository = this.defaultRepository;
    }
  }

  async findOneById(id: string): Promise<RoomStateEntity> {
    const roomState = await this.roomsStatesRepository.findOne({
      where: { id },
    });

    if (!roomState) {
      throw new EntityNotFoundException('room-state');
    }

    return roomState;
  }

  findAll(): Promise<RoomStateEntity[]> {
    return this.roomsStatesRepository.find({
      where: {
        status: Status.ACTIVE,
      },
    });
  }

  create(request: Partial<RoomStateEntity>): RoomStateEntity {
    return this.roomsStatesRepository.create(request);
  }

  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    const { name } = request;

    const roomState = await this.roomsStatesRepository.findOne({
      where: {
        name,
      },
    });

    if (roomState) {
      throw new ConflictException(
        `Already exists a room state with name: ${name}`,
      );
    }

    return this.roomsStatesRepository.save(request);
  }

  async update(request: UpdateRoomStateDto): Promise<RoomStateEntity> {
    const { roomStateId } = request;

    const roomState = await this.findOneById(roomStateId);

    Object.assign(roomState, request);

    return this.roomsStatesRepository.save(roomState);
  }

  async deleteById(id: string): Promise<RoomStateEntity> {
    const { id: roomStateId } = await this.findOneById(id);

    const result: UpdateResult = await this.roomsStatesRepository.update(
      roomStateId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result.affected !== 1) {
      throw new InternalServerErrorException(
        'Error to delete the room state, try later',
      );
    }

    return this.findOneById(roomStateId);
  }
}
