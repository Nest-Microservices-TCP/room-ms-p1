import { HttpStatus, Injectable } from '@nestjs/common';
import { UnitOfWork } from '../common/unit-of-work/unit-of-work.service';
import { RoomStateEntity } from './entities/room-state.entity';
import { CreateRoomStateDto } from './dto/create-room-state.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RoomsStatesService {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async save(request: CreateRoomStateDto): Promise<RoomStateEntity> {
    let newRoomState: RoomStateEntity;

    try {
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
}
