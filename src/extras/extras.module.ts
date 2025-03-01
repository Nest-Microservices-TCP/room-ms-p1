import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExtrasService } from './extras.service';
import { ExtrasController } from './extras.controller';
import { ExtrasRepository } from './repository/extras.repository';

import { Extra } from './entity/extra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Extra])],
  providers: [ExtrasRepository, ExtrasService],
  controllers: [ExtrasController],
})
export class ExtrasModule {}
