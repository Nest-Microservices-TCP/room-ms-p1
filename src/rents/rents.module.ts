import { RentsRepository } from './repository/rents.repository';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentsService } from './rents.service';
import { Module } from '@nestjs/common';
import { RentEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity])],
  controllers: [RentsController],
  providers: [RentsRepository, RentsService],
})
export class RentsModule {}
