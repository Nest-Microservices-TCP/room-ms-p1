import { RentsExtrasService } from './rents-extras.service';
import { MessagePattern } from '@nestjs/microservices';
import { RentExtraResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';

@Controller()
export class RentsExtrasController {
  constructor(private readonly rentsExtrasService: RentsExtrasService) {}

  @MessagePattern({ cmd: 'find.all.rents.extras' })
  async findAll(): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.findAll();
  }
}
