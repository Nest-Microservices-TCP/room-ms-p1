import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  RoomState,
  CreateRoomStateRequest,
  FindOneRoomStateRequest,
  FindRoomsStatesResponse,
  FindRoomsStatesByIdsRequest,
  RoomsStatesServiceController,
  RoomsStatesServiceControllerMethods,
} from 'src/grpc/rooms/rooms_states.pb';

import { RoomsStatesService } from './rooms-states.service';

@Controller()
@RoomsStatesServiceControllerMethods()
export class RoomsStatesController implements RoomsStatesServiceController {
  constructor(private readonly roomsStatesService: RoomsStatesService) {}

  save(request: CreateRoomStateRequest): void {
    this.roomsStatesService.save(request);
  }
  findOne(
    request: FindOneRoomStateRequest,
  ): Promise<RoomState> | Observable<RoomState> | RoomState {
    return this.roomsStatesService.findOne(request);
  }
  find():
    | Promise<FindRoomsStatesResponse>
    | Observable<FindRoomsStatesResponse>
    | FindRoomsStatesResponse {
    return this.roomsStatesService.find();
  }
  findByIds(
    request: FindRoomsStatesByIdsRequest,
  ):
    | Promise<FindRoomsStatesResponse>
    | Observable<FindRoomsStatesResponse>
    | FindRoomsStatesResponse {
    return this.roomsStatesService.findByIds(request);
  }
}
