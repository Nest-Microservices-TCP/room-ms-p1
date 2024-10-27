import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoomDto, UpdateRoomDto } from './dto/request';
import { RoomResponseDto } from './dto/response';
import { RoomsService } from './rooms.service';
import { Controller } from '@nestjs/common';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @MessagePattern({ cmd: 'save.room' })
  save(@Payload() request: CreateRoomDto): Promise<RoomResponseDto> {
    return this.roomsService.save(request);
  }

  @MessagePattern({ cmd: 'find.one.room.by.id' })
  findOnById(@Payload('roomId') roomId: string): Promise<RoomResponseDto> {
    return this.roomsService.findOneById(roomId);
  }

  @MessagePattern({ cmd: 'find.rooms.by.ids' })
  findByIds(@Payload() roomsIds: string[]): Promise<RoomResponseDto[]> {
    return this.roomsService.findByIds(roomsIds);
  }

  @MessagePattern({ cmd: 'find.all.rooms' })
  findAll(): Promise<RoomResponseDto[]> {
    return this.roomsService.findAll();
  }

  @MessagePattern({ cmd: 'update.room' })
  update(@Payload() request: UpdateRoomDto): Promise<RoomResponseDto> {
    return this.roomsService.update(request);
  }

  @MessagePattern({ cmd: 'remove.room.by.id' })
  remove(@Payload('roomId') roomId: string): Promise<RoomResponseDto> {
    return this.roomsService.remove(roomId);
  }
}
