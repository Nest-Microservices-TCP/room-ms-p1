import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatesExtrasService } from './rates-extras.service';
import { RatesExtrasController } from './rates-extras.controller';
import { RatesExtrasRepository } from './repository/rates-extras.repository';

import { RateExtra } from './entity/rate-extra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RateExtra])],
  controllers: [RatesExtrasController],
  providers: [RatesExtrasRepository, RatesExtrasService],
  exports: [RatesExtrasService],
})
export class RatesExtrasModule {}
