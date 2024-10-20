import { Controller } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { ExtraResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}

  @MessagePattern({ cmd: 'find.all.extras' })
  findAll(): Promise<ExtraResponseDto[]> {
    return this.extrasService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.extra.by.id' })
  findOneById(@Payload('extraId') extraId: string): Promise<ExtraResponseDto> {
    return this.extrasService.findOneById(extraId);
  }
}
