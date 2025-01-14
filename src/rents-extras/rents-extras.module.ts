import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RentExtra } from './entity/rent-extra.entity';

import { RentsExtrasController } from './rents-extras.controller';
import { RentsExtrasService } from './rents-extras.service';
import { RentsExtrasRepository } from './repository/rents-extras.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RentExtra])],
  providers: [RentsExtrasRepository, RentsExtrasService],
  controllers: [RentsExtrasController],
})
export class RentsExtrasModule {}
