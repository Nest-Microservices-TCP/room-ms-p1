import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rent } from './entity';

import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { RentsRepository } from './repository/rents.repository';

import { RatesModule } from 'src/rates/rates.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RentsExtrasModule } from 'src/rents-extras/rents-extras.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rent]),
    RatesModule,
    RoomsModule,
    RentsExtrasModule,
  ],
  controllers: [RentsController],
  providers: [RentsRepository, RentsService],
})
export class RentsModule {}
