import { RentsRepository } from './repository/rents.repository';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentsService } from './rents.service';
import { Module } from '@nestjs/common';
import { Rent } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent])],
  controllers: [RentsController],
  providers: [RentsRepository, RentsService],
})
export class RentsModule {}
