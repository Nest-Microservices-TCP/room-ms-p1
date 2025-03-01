import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Extra,
  GetExtraRequest,
  CreateExtraRequest,
  ListExtrasResponse,
  ExtrasServiceController,
  ExtrasServiceControllerMethods,
} from 'src/grpc/proto/rooms/extras.pb';

import { ExtrasService } from './extras.service';

@Controller()
@ExtrasServiceControllerMethods()
export class ExtrasController implements ExtrasServiceController {
  constructor(private readonly extrasService: ExtrasService) {}

  createExtra(request: CreateExtraRequest): void {
    this.extrasService.save(request);
  }
  getExtra(
    request: GetExtraRequest,
  ): Promise<Extra> | Observable<Extra> | Extra {
    return this.extrasService.findOne(request);
  }
  listExtras():
    | Promise<ListExtrasResponse>
    | Observable<ListExtrasResponse>
    | ListExtrasResponse {
    return this.extrasService.findAll();
  }
}
