import { Expose } from 'class-transformer';

export class ExtraResponseDto {
  @Expose()
  extraId: string;

  @Expose()
  name: string;
}
