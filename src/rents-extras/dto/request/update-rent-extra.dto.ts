import { IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';
import { ExtraEntity } from 'src/extras/entity/extra.entity';
import { RentEntity } from 'src/rents/entity';

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

  rent: RentEntity;
  extra: ExtraEntity;
}
