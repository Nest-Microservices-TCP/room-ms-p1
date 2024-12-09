import { CreateRentExtraDto, UpdateRentExtraDto } from './dto/request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResultResponse } from 'src/common/dto/response';
import { RentsExtrasService } from './rents-extras.service';
import { RentExtraResponseDto } from './dto/response';
import { Controller } from '@nestjs/common';

@Controller()
export class RentsExtrasController {
  constructor(private readonly rentsExtrasService: RentsExtrasService) {}

  @MessagePattern({ cmd: 'find.all.rents.extras' })
  async findAll(): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.rent.extra' })
  async findOneById(
    @Payload('rentExtraId') rentExtraId: string,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.findOne(rentExtraId);
  }

  @MessagePattern({ cmd: 'find.rents.extras.by.ids' })
  async findByIds(
    @Payload('rentsExtrasIds') rentsExtrasIds: string[],
  ): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.findByIds(rentsExtrasIds);
  }

  @MessagePattern({ cmd: 'save.rent.extra' })
  async save(
    @Payload() request: CreateRentExtraDto,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.save(request);
  }

  @MessagePattern({ cmd: 'update.rent.extra' })
  async update(
    @Payload() request: UpdateRentExtraDto,
  ): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.update(request);
  }

  @MessagePattern({ cmd: 'remove.rent.extra.by.id' })
  async remove(
    @Payload('rentExtraId') rentExtraId: string,
  ): Promise<DeleteResultResponse> {
    return this.rentsExtrasService.remove(rentExtraId);
  }
}
