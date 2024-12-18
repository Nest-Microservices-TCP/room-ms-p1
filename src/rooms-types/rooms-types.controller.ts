import { RoomsTypesService } from './rooms-types.service';
import { MessagePattern } from '@nestjs/microservices';
import { RoomTypeResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';

@Controller()
export class RoomsTypesController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  @MessagePattern({ cmd: 'find.all.rooms.types' })
  findAll(): Promise<RoomTypeResponseDto[]> {
    return this.roomsTypesService.findAll();
  }
}
