import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rate } from './entity/rate.entity';

import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { RatesRepository } from './repository/rates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  controllers: [RatesController],
  providers: [RatesRepository, RatesService],
  exports: [RatesService],
})
export class RatesModule {}
