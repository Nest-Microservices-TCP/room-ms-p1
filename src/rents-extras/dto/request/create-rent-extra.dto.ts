import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ExtraEntity } from 'src/extras/entity/extra.entity';
import { RentEntity } from 'src/rents/entity';

export class CreateRentExtraDto {
  @Min(1)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;

  @Min(1)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  total: number;

  rent: RentEntity;
  extra: ExtraEntity;
}
