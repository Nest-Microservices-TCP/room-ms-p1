import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Rate,
  CreateRateRequest,
  FindRatesResponse,
  FindOneRateRequest,
  RatesServiceController,
  RatesServiceControllerMethods,
} from 'src/grpc/proto/rooms/rates.pb';

import { RatesService } from './rates.service';

@Controller()
@RatesServiceControllerMethods()
export class RatesController implements RatesServiceController {
  constructor(private readonly ratesService: RatesService) {}
  save(request: CreateRateRequest): void {
    this.ratesService.save(request);
  }
  findOne(
    request: FindOneRateRequest,
  ): Promise<Rate> | Observable<Rate> | Rate {
    return this.ratesService.findOne(request);
  }
  find():
    | Promise<FindRatesResponse>
    | Observable<FindRatesResponse>
    | FindRatesResponse {
    return this.ratesService.find();
  }
}
