import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ExtrasService } from './extras.service';

import { CreateExtraDto, UpdateExtraDto } from './dto/request';
import { ExtraResponseDto } from './dto/response';

@Controller()
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}

  @MessagePattern('rooms.find.all.extras')
  findAll(): Promise<ExtraResponseDto[]> {
    return this.extrasService.findAll();
  }

  @MessagePattern('rooms.find.one.extra')
  findOne(@Payload('extraId') extraId: string): Promise<ExtraResponseDto> {
    return this.extrasService.findOne(extraId);
  }

  @MessagePattern('rooms.find.extras.by.ids')
  findByIds(@Payload() extrasIds: string[]): Promise<ExtraResponseDto[]> {
    return this.extrasService.findByIds(extrasIds);
  }

  @MessagePattern('rooms.save.extra')
  save(@Payload() request: CreateExtraDto): Promise<ExtraResponseDto> {
    return this.extrasService.save(request);
  }

  @MessagePattern('rooms.update.extra')
  update(@Payload() request: UpdateExtraDto): Promise<ExtraResponseDto> {
    return this.extrasService.update(request);
  }

  @MessagePattern('rooms.remove.extra')
  remove(@Payload('extraId') extraId: string): Promise<ExtraResponseDto> {
    return this.extrasService.remove(extraId);
  }
}
