import { InjectRepository } from '@nestjs/typeorm';
import { RoomStateEntity } from '../entities/room-state.entity';
import { IRoomsStateRepository } from './interfaces/rooms-state.repository.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRoomStateDto } from '../dto/create-room-state.dto';

@Injectable()
export class RoomsStatesRepository implements IRoomsStateRepository {
  constructor(
    @InjectRepository(RoomStateEntity)
    private readonly roomStatesRepository: Repository<RoomStateEntity>,
  ) {}

  findById(id: string): Promise<RoomStateEntity> {
    return this.roomStatesRepository.findOne({
      where: { id },
    });
  }

  findAll(): Promise<RoomStateEntity[]> {
    return this.roomStatesRepository.find();
  }

  create(roomState: Partial<RoomStateEntity>): RoomStateEntity {
    return this.roomStatesRepository.create(roomState);
  }

  save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    return this.roomStatesRepository.save(request);
  }

  async deleteById(id: string): Promise<RoomStateEntity> {
    const roomState = await this.roomStatesRepository.findOne({
      where: { id },
    });

    await this.roomStatesRepository.delete(id);

    return roomState;
  }
}
