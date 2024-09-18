import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/dto';

export class RoomStateResponse extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;
}
