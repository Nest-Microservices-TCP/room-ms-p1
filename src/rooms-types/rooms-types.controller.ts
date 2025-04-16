import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  RoomType,
  CreateRoomTypeRequest,
  FindOneRoomTypeRequest,
  RoomsTypesServiceController,
  RoomsTypesServiceControllerMethods,
} from 'src/grpc/rooms/rooms_types.pb';

import { RoomsTypesService } from './rooms-types.service';

@Controller()
@RoomsTypesServiceControllerMethods()
export class RoomsTypesController implements RoomsTypesServiceController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  save(request: CreateRoomTypeRequest): void {
    this.roomsTypesService.save(request);
  }

  findOne(
    request: FindOneRoomTypeRequest,
  ): Promise<RoomType> | Observable<RoomType> | RoomType {
    return this.roomsTypesService.findOne(request);
  }
}
