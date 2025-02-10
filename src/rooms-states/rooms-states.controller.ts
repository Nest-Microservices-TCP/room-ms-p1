import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import {
  CreateRoomStateDto,
  FindOneRoomStateByIdDto,
  UpdateRoomStateDto,
} from './dto/request';
import { RoomStateResponseDto } from './dto/response';

import { RoomsStatesService } from './rooms-states.service';

@Controller()
export class RoomsStatesController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  @MessagePattern('rooms.save.roomState')
  async save(
    @Payload() request: CreateRoomStateDto,
  ): Promise<RoomStateResponseDto> {
    return this.roomsStatesService.save(request);
  }

  @MessagePattern('rooms.find.one.roomState')
  async findOne(
    @Payload() request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateResponseDto> {
    return this.roomsStatesService.findOne(request);
  }

  @MessagePattern({ cmd: 'find.rooms.states.by.ids' })
  async findByIds(
    @Payload('roomsStatesIds') roomsStatesIds: string[],
  ): Promise<RoomStateResponseDto[]> {
    return this.roomsStatesService.findByIds(roomsStatesIds);
  }

  @MessagePattern({ cmd: 'find.all.roomsStates' })
  async findAll(): Promise<RoomStateResponseDto[]> {
    return this.roomsStatesService.findAll();
  }

  @MessagePattern({ cmd: 'update.roomState' })
  async update(
    @Payload() request: UpdateRoomStateDto,
  ): Promise<RoomStateResponseDto> {
    return this.roomsStatesService.update(request);
  }

  @MessagePattern({ cmd: 'remove.roomState.by.id' })
  async remove(
    @Payload('roomStateId') roomStateId: string,
  ): Promise<DeleteResultResponse> {
    return this.roomsStatesService.remove(roomStateId);
  }
}
