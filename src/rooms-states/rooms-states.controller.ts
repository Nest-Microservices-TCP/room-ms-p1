import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResultResponse } from 'src/common/dto/response';
import { RoomsStatesService } from './rooms-states.service';
import { RoomStateResponseDto } from './dto/response';
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
  ): Promise<RoomStateResponseDto> {
    return this.roomsStatesService.save(request);
  }

  @MessagePattern({ cmd: 'find.one.roomState' })
  async findOneById(
    @Payload() request: FindOneRoomStateByIdDto,
  ): Promise<RoomStateResponseDto> {
    return this.roomsStatesService.findOneById(request);
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
