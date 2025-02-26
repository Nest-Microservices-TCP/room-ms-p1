import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RatesService } from './rates.service';

import { FindOneRateRequest } from 'src/grpc/rooms/rates/rates-request.pb';
import { Rate } from 'src/grpc/rooms/rates/rates-response.pb';
import {
  RatesServiceController,
  RatesServiceControllerMethods,
} from 'src/grpc/rooms/rates/rates.pb';

@Controller()
@RatesServiceControllerMethods()
export class RatesController implements RatesServiceController {
  constructor(private readonly ratesService: RatesService) {}

  findOne(
    request: FindOneRateRequest,
  ): Promise<Rate> | Observable<Rate> | Rate {
    return this.ratesService.findOne(request);
  }
}
