import { RatesRepository } from './repository/rates.repository';
import { RatesController } from './rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesService } from './rates.service';
import { Rate } from './entity/rate.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  controllers: [RatesController],
  providers: [RatesRepository, RatesService],
})
export class RatesModule {}
