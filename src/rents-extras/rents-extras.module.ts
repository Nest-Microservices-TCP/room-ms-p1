import { RentsExtrasRepository } from './repository/rents-extras.repository';
import { RentsExtrasController } from './rents-extras.controller';
import { RentsExtrasService } from './rents-extras.service';
import { RentExtra } from './entity/rent-extra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RentExtra])],
  providers: [RentsExtrasRepository, RentsExtrasService],
  controllers: [RentsExtrasController],
})
export class RentsExtrasModule {}
