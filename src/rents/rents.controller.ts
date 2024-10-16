import { Controller } from '@nestjs/common';
import { RentsService } from './rents.service';

@Controller()
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}
}
