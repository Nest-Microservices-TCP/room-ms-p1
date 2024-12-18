import { RoomsTypesService } from './rooms-types.service';
import { Controller } from '@nestjs/common';

@Controller()
export class RoomsTypesController {
  constructor(private readonly roomsTypesService: RoomsTypesService) {}
}
