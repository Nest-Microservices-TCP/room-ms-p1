import { Module } from '@nestjs/common';
import { RentEntity } from './entity';
import { RentsService } from './rents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentsController } from './rents.controller';
import { RentsRepository } from './repository/rents.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity])],
  controllers: [RentsController],
  providers: [RentsRepository, RentsService],
})
export class RentsModule {}
