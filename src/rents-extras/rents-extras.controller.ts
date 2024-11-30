import { Controller } from '@nestjs/common';
import { RentsExtrasService } from './rents-extras.service';

@Controller()
export class RentsExtrasController {
  constructor(private readonly rentsExtrasService: RentsExtrasService) {}
}
