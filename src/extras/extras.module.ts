import { ExtrasRepository } from './repository/extras.repository';
import { ExtrasController } from './extras.controller';
import { ExtrasService } from './extras.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extra } from './entity/extra.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Extra])],
  providers: [ExtrasRepository, ExtrasService],
  controllers: [ExtrasController],
})
export class ExtrasModule {}
