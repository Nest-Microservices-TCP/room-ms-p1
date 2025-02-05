import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rent } from './entity';

import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import { RentsRepository } from './repository/rents.repository';

import { RatesModule } from 'src/rates/rates.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rent]), RatesModule],
  controllers: [RentsController],
  providers: [RentsRepository, RentsService],
})
export class RentsModule {}
