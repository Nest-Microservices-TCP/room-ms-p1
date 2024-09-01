import { HttpStatus, Injectable } from '@nestjs/common';
import { UnitOfWork } from '../common/unit-of-work/unit-of-work.service';
import { RoomStateEntity } from './entities/room-state.entity';
import { CreateRoomStateDto } from './dto/create-room-state.dto';
import { RpcException } from '@nestjs/microservices';
import { FindOneRoomStateByIdDto } from './dto/find-one-room-state-by-id.dto';

@Injectable()
export class RoomsStatesService {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    let newRoomState: RoomStateEntity;

    try {
      await this.unitOfWork.start();

      await this.unitOfWork.complete(async () => {
        const roomStatesRepository = this.unitOfWork.getRoomsStatesRepository();

        newRoomState = await roomStatesRepository.save(request);
      });

      return newRoomState;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to create room-state: ${error}`,
      });
    }
  }

  async findOneById(
    request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateEntity> {
    const { roomStateId } = request;
    let roomState: RoomStateEntity;

    try {
      await this.unitOfWork.start();

      await this.unitOfWork.complete(async () => {
        const roomsStatesRepository =
          this.unitOfWork.getRoomsStatesRepository();

        roomState = await roomsStatesRepository.findOneById(roomStateId);
      });

      return roomState;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to find room-state: ${error}`,
      });
    }
  }

  async findAll(): Promise<RoomStateEntity[]> {
    let roomsStates: RoomStateEntity[];

    try {
      await this.unitOfWork.start();

      await this.unitOfWork.complete(async () => {
        const roomsStatesRepository =
          this.unitOfWork.getRoomsStatesRepository();

        roomsStates = await roomsStatesRepository.findAll();
      });

      return roomsStates;
    } catch (error) {
      throw new RpcException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error to get all room states: ${error}`,
      });
    }
  }
}
