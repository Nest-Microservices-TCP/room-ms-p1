import { Controller } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentResponseDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @MessagePattern({ cmd: 'find.all.rents' })
  async findAll(): Promise<RentResponseDto[]> {
    const rents = await this.rentsService.findAll();

    return plainToInstance(RentResponseDto, rents, {
      excludeExtraneousValues: true,
    });
  }

  @MessagePattern({ cmd: 'find.one.rent.by.id' })
  async findOneById(rentId): Promise<RentResponseDto> {
    const rent = await this.rentsService.findOneById(rentId);

    return plainToInstance(RentResponseDto, rent, {
      excludeExtraneousValues: true,
    });
  }
}
