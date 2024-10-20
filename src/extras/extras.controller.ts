import { Controller } from '@nestjs/common';
import { ExtrasService } from './extras.service';

@Controller()
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}
}
