import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRentDto, UpdateRentDto } from './dto/request';
import { plainToInstance } from 'class-transformer';
import { RentResponseDto } from './dto/response';
import { RentsService } from './rents.service';
import { Controller } from '@nestjs/common';

@Controller()
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @MessagePattern({ cmd: 'find.all.rents' })
  async findAll(): Promise<RentResponseDto[]> {
    return this.rentsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.rent.by.id' })
  async findOneById(
    @Payload('rentId') rentId: string,
  ): Promise<RentResponseDto> {
    return this.rentsService.findOneById(rentId);
  }

  @MessagePattern({ cmd: 'find.rents.by.ids' })
  async findByIds(@Payload() rentsIds: string[]): Promise<RentResponseDto[]> {
    return this.rentsService.findByIds(rentsIds);
  }

  @MessagePattern({ cmd: 'save.rent' })
  async save(@Payload() request: CreateRentDto): Promise<RentResponseDto> {
    return this.rentsService.save(request);
  }

  @MessagePattern({ cmd: 'update.rent' })
  async update(request: UpdateRentDto): Promise<RentResponseDto> {
    const rent = await this.rentsService.update(request);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }

  @MessagePattern({ cmd: 'remove.rent.by.id' })
  async remove(rentId: string): Promise<RentResponseDto> {
    const rent = await this.rentsService.remove(rentId);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }
}
