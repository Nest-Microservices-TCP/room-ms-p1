import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

import {
  CreateRentRequest,
  RentsServiceController,
  RentsServiceControllerMethods,
} from 'src/grpc/rooms/rents.pb';

import { RentsService } from './rents.service';

@Controller()
@RentsServiceControllerMethods()
export class RentsController implements RentsServiceController {
  constructor(private readonly rentsService: RentsService) {}

  async save(@Payload() request: CreateRentRequest): Promise<void> {
    this.rentsService.save(request);
  }
}
