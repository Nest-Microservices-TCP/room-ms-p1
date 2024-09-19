import { Controller } from '@nestjs/common';
import { RoomsStatesService } from './rooms-state.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateRoomStateDto,
  FindOneRoomStateByIdDto,
  UpdateRoomStateDto,
} from './dto/request';
import { RoomStateResponse } from './dto/response';

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

  @MessagePattern({ cmd: 'delete.roomState.by.id' })
  async deleteById(@Payload('id') id: string): Promise<RoomStateResponse> {
    return this.roomsStatesService.deleteById(id);
  }
}
