import { RentsExtrasRepository } from './repository/rents-extras.repository';
import { RentsExtrasController } from './rents-extras.controller';
import { RentExtraEntity } from './entity/rent-extra.entity';
import { RentsExtrasService } from './rents-extras.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RentExtraEntity])],
  providers: [RentsExtrasRepository, RentsExtrasService],
  controllers: [RentsExtrasController],
})
export class RentsExtrasModule {}
