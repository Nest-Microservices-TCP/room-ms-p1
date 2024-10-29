import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoomsStatesService } from './rooms-state.service';
import { RoomStateResponse } from './dto/response';
import { Controller } from '@nestjs/common';
import {
  CreateRoomStateDto,
  UpdateRoomStateDto,
  FindOneRoomStateByIdDto,
} from './dto/request';

@Controller()
export class RoomsStatesController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  @MessagePattern({ cmd: 'save.roomState' })
  async save(
    @Payload() request: CreateRoomStateDto,
  ): Promise<RoomStateResponse> {
    return this.roomsStatesService.save(request);
  }

  @MessagePattern({ cmd: 'find.one.roomState' })
  async findOneById(
    @Payload() request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateResponse> {
    return this.roomsStatesService.findOneById(request);
  }

  @MessagePattern({ cmd: 'find.rooms.states.by.ids' })
  async findByIds(roomsStatesIds: string[]): Promise<RoomStateResponse[]> {
    return this.roomsStatesService.findByIds(roomsStatesIds);
  }

  @MessagePattern({ cmd: 'find.all.roomsStates' })
  async findAll(): Promise<RoomStateResponse[]> {
    return this.roomsStatesService.findAll();
  }

  @MessagePattern({ cmd: 'update.roomState' })
  async update(
    @Payload() request: UpdateRoomStateDto,
  ): Promise<RoomStateResponse> {
    return this.roomsStatesService.update(request);
  }

  @MessagePattern({ cmd: 'remove.roomState.by.id' })
  async remove(
    @Payload('roomStateId') roomStateId: string,
  ): Promise<RoomStateResponse> {
    return this.roomsStatesService.remove(roomStateId);
  }
}
