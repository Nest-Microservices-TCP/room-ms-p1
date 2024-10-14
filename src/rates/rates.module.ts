import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from './entity/rate.entity';
import { RatesController } from './rates.controller';
import { RatesRepository } from './repository/rates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  controllers: [RatesController],
  providers: [RatesRepository, RatesService],
})
export class RatesModule {}
