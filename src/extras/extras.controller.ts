import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  Extra,
  CreateExtraRequest,
  FindExtrasResponse,
  FindOneExtraRequest,
  FindExtrasByIdsRequest,
  ExtrasServiceController,
  ExtrasServiceControllerMethods,
} from 'src/grpc/rooms/extras.pb';

import { ExtrasService } from './extras.service';

@Controller()
@ExtrasServiceControllerMethods()
export class ExtrasController implements ExtrasServiceController {
  constructor(private readonly extrasService: ExtrasService) {}

  save(request: CreateExtraRequest): void {
    this.extrasService.save(request);
  }
  findOne(
    request: FindOneExtraRequest,
  ): Promise<Extra> | Observable<Extra> | Extra {
    return this.extrasService.findOne(request);
  }
  find():
    | Promise<FindExtrasResponse>
    | Observable<FindExtrasResponse>
    | FindExtrasResponse {
    return this.extrasService.find();
  }
  findByIds(
    request: FindExtrasByIdsRequest,
  ):
    | Promise<FindExtrasResponse>
    | Observable<FindExtrasResponse>
    | FindExtrasResponse {
    return this.extrasService.findByIds(request);
  }
}
