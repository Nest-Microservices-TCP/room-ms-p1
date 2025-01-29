import { IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';
import { Extra } from 'src/extras/entity/extra.entity';
import { Rent } from 'src/rents/entity';

export class UpdateRentExtraDto {
  @IsUUID('4')
  rentExtraId: string;

  @Min(1)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  @Min(1)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  total?: number;

  rent: Rent;
  extra: Extra;
}
