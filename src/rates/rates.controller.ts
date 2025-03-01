import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Rate,
  GetRateRequest,
  CreateRateRequest,
  ListRatesResponse,
  RatesServiceController,
  RatesServiceControllerMethods,
} from 'src/grpc/proto/rooms/rates.pb';

import { RatesService } from './rates.service';

@Controller()
@RatesServiceControllerMethods()
export class RatesController implements RatesServiceController {
  constructor(private readonly ratesService: RatesService) {}

  createRate(request: CreateRateRequest): void {
    this.ratesService.createRate(request);
  }
  getRate(request: GetRateRequest): Promise<Rate> | Observable<Rate> | Rate {
    return this.ratesService.getRate(request);
  }
  listRates():
    | Promise<ListRatesResponse>
    | Observable<ListRatesResponse>
    | ListRatesResponse {
    return this.ratesService.listRates();
  }
}
