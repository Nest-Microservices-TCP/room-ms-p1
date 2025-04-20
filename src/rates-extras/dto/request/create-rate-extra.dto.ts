import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

import { Rate as IRate } from 'src/grpc/rooms/rates.pb';
import { Extra as IExtra } from 'src/grpc/rooms/extras.pb';

import { Rate } from 'src/rates/entity/rate.entity';
import { Extra } from 'src/extras/entity/extra.entity';

export class CreateRateExtraDto {
  @IsNumber()
  @IsPositive()
  cost: number;

  @Type(() => Rate)
  rate: IRate;

  @Type(() => Extra)
  extra: IExtra;
}
