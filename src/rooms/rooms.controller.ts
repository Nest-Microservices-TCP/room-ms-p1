import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RoomResponseDto } from './dto/response';

import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @MessagePattern('rooms.find.all.rooms')
  async findAll(): Promise<RoomResponseDto[]> {
    return this.roomsService.findAll();
  }

  @MessagePattern('rooms.find.one.room')
  async findOne(@Payload('roomId') roomId: string): Promise<RoomResponseDto> {
    return this.roomsService.findOne(roomId);
  }

  @MessagePattern('rooms.save.room')
  async save(@Payload() request: CreateRoomDto): Promise<RoomResponseDto> {
    return this.roomsService.save(request);
  }

  @MessagePattern('rooms.update.room')
  async update(@Payload() request: UpdateRoomDto): Promise<RoomResponseDto> {
    return this.roomsService.update(request);
  }

  @MessagePattern('rooms.remove.room')
  async remove(
    @Payload('roomId') roomId: string,
  ): Promise<DeleteResultResponse> {
    return this.roomsService.remove(roomId);
  }
}
