import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UpdateRentExtraDto } from './dto/request';
import { RentExtraResponseDto } from './dto/response';
import { DeleteResultResponse } from 'src/common/dto/response';

import { RentsExtrasService } from './rents-extras.service';

@Controller()
export class RentsExtrasController {
  constructor(private readonly rentsExtrasService: RentsExtrasService) {}

  @MessagePattern('rentsExtras.find.all')
  async find(): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.find();
  }

  @MessagePattern('rentsExtras.find.one')
  async findOne(
    @Payload('rentExtraId') rentExtraId: string,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.findOne(rentExtraId);
  }

  @MessagePattern('rentsExtras.find.by.ids')
  async findByIds(
    @Payload('rentsExtrasIds') rentsExtrasIds: string[],
  ): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.findByIds(rentsExtrasIds);
  }

  @MessagePattern('rentsExtras.update')
  async update(
    @Payload() request: UpdateRentExtraDto,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.update(request);
  }

  @MessagePattern('rentsExtras.remove')
  async remove(
    @Payload('rentExtraId') rentExtraId: string,
  ): Promise<DeleteResultResponse> {
    return this.rentsExtrasService.remove(rentExtraId);
  }
}
