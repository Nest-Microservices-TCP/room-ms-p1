import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateRentDto, UpdateRentDto } from './dto/request';
import { RentResponseDto } from './dto/response';

import { RentsService } from './rents.service';

@Controller()
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @MessagePattern('rents.find.all')
  async findAll(): Promise<RentResponseDto[]> {
    return this.rentsService.findAll();
  }

  @MessagePattern('rents.find.one')
  async findOne(@Payload('rentId') rentId: string): Promise<RentResponseDto> {
    return this.rentsService.findOne(rentId);
  }

  @MessagePattern('rents.find.by.ids')
  async findByIds(@Payload() rentsIds: string[]): Promise<RentResponseDto[]> {
    return this.rentsService.findByIds(rentsIds);
  }

  @MessagePattern('rents.save')
  async save(@Payload() request: CreateRentDto): Promise<RentResponseDto> {
    return this.rentsService.save(request);
  }

  @MessagePattern('rents.update')
  async update(@Payload() request: UpdateRentDto): Promise<RentResponseDto> {
    return this.rentsService.update(request);
  }

  @MessagePattern('rents.remove')
  async remove(@Payload('rentId') rentId: string): Promise<RentResponseDto> {
    return this.rentsService.remove(rentId);
  }
}
