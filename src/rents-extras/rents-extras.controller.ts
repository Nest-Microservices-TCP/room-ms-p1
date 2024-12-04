import { CreateRentExtraDto, UpdateRentExtraDto } from './dto/request';
import { DeleteResultResponse } from 'src/common/dto/response';
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

  @MessagePattern({ cmd: 'find.one.rent.extra.by.id' })
  async findOneById(rentExtraId: string): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.findOneById(rentExtraId);
  }

  @MessagePattern({ cmd: 'find.rents.extras.by.ids' })
  async findByIds(rentsExtrasIds: string[]): Promise<RentExtraResponseDto[]> {
    return this.rentsExtrasService.findByIds(rentsExtrasIds);
  }

  @MessagePattern({ cmd: 'save.rent.extra' })
  async save(request: CreateRentExtraDto): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.save(request);
  }

  @MessagePattern({ cmd: 'update.rent.extra' })
  async update(request: UpdateRentExtraDto): Promise<RentExtraResponseDto> {
    return this.rentsExtrasService.update(request);
  }

  @MessagePattern({ cmd: 'remove.rent.extra.by.id' })
  async remove(rentExtraId: string): Promise<DeleteResultResponse> {
    return this.rentsExtrasService.remove(rentExtraId);
  }
}
