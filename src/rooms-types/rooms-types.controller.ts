import { Controller } from '@nestjs/common';

import {
  CreateRoomTypeRequest,
  RoomsTypesServiceController,
  RoomsTypesServiceControllerMethods,
} from 'src/grpc/proto/rooms/rooms_types.pb';

import { RoomsTypesService } from './rooms-types.service';

@Controller()
@RoomsTypesServiceControllerMethods()
export class RoomsTypesController implements RoomsTypesServiceController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}

  save(request: CreateRoomTypeRequest): void {
    this.roomsTypesService.save(request);
  }
}
