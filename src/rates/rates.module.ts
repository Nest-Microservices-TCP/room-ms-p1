import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { RatesRepository } from './repository/rates.repository';

import { Rate } from './entity/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  providers: [RatesRepository, RatesService],
  controllers: [RatesController],
  exports: [RatesService],
})
export class RatesModule {}
