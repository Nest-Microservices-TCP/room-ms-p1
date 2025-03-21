import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RentExtra } from './entity/rent-extra.entity';

import { RentsExtrasController } from './rents-extras.controller';
import { RentsExtrasService } from './rents-extras.service';
import { RentsExtrasRepository } from './repository/rents-extras.repository';
import { RatesExtrasModule } from 'src/rates-extras/rates-extras.module';

@Module({
  imports: [TypeOrmModule.forFeature([RentExtra]), RatesExtrasModule],
  providers: [RentsExtrasRepository, RentsExtrasService],
  controllers: [RentsExtrasController],
  exports: [RentsExtrasService],
})
export class RentsExtrasModule {}
