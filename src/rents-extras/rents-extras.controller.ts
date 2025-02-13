import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRentExtraDto, UpdateRentExtraDto } from './dto/request';
import { RentExtraResponseDto } from './dto/response';

import { RentsExtrasService } from './rents-extras.service';

@Controller()
export class RentsExtrasController {
  constructor(private readonly rentsExtrasService: RentsExtrasService) {}

  @MessagePattern('rooms.find.all.rentsExtras')
  async findAll(): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.findAll();
  }

  @MessagePattern('rooms.find.one.rentExtra')
  async findOne(
    @Payload('rentExtraId') rentExtraId: string,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.findOne(rentExtraId);
  }

  @MessagePattern('rooms.find.rentsExtras.by.ids')
  async findByIds(
    @Payload('rentsExtrasIds') rentsExtrasIds: string[],
  ): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.findByIds(rentsExtrasIds);
  }

  @MessagePattern('rooms.save.rentExtra')
  async save(
    @Payload() request: CreateRentExtraDto,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.save(request);
  }

  @MessagePattern('rooms.update.rentExtra')
  async update(
    @Payload() request: UpdateRentExtraDto,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.update(request);
  }

  @MessagePattern('rooms.remove.rentExtra')
  async remove(
    @Payload('rentExtraId') rentExtraId: string,
  ): Promise<DeleteResultResponse> {
    return this.rentsExtrasService.remove(rentExtraId);
  }
}
