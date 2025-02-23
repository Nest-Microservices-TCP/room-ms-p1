import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ExtrasService } from './extras.service';

import { CreateExtraDto, UpdateExtraDto } from './dto/request';
import { ExtraResponseDto } from './dto/response';

@Controller()
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}

  @MessagePattern('extras.find.all')
  async findAll(): Promise<ExtraResponseDto[]> {
    return this.extrasService.findAll();
  }

  @MessagePattern('extras.find.one')
  async findOne(
    @Payload('extraId') extraId: string,
  ): Promise<ExtraResponseDto> {
    return this.extrasService.findOne(extraId);
  }

  @MessagePattern('extras.find.by.ids')
  async findByIds(@Payload() extrasIds: string[]): Promise<ExtraResponseDto[]> {
    return this.extrasService.findByIds(extrasIds);
  }

  @MessagePattern('extras.save')
  async save(@Payload() request: CreateExtraDto): Promise<ExtraResponseDto> {
    return this.extrasService.save(request);
  }

  @MessagePattern('extras.update')
  async update(@Payload() request: UpdateExtraDto): Promise<ExtraResponseDto> {
    return this.extrasService.update(request);
  }

  @MessagePattern('extras.remove')
  async remove(@Payload('extraId') extraId: string): Promise<ExtraResponseDto> {
    return this.extrasService.remove(extraId);
  }
}
