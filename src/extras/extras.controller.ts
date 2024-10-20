import { Controller } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { ExtraResponseDto } from './dto/response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateExtraDto, UpdateExtraDto } from './dto/request';

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

  @MessagePattern({ cmd: 'save.extra' })
  save(@Payload() request: CreateExtraDto): Promise<ExtraResponseDto> {
    return this.extrasService.save(request);
  }

  @MessagePattern({ cmd: 'update.extra' })
  update(@Payload() request: UpdateExtraDto): Promise<ExtraResponseDto> {
    return this.extrasService.update(request);
  }
}
