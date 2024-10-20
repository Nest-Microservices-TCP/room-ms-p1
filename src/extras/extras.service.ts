import { Injectable } from '@nestjs/common';
import { ExtrasRepository } from './repository/extras.repository';

@Injectable()
export class ExtrasService {
  constructor(private readonly extrasRepository: ExtrasRepository) {}
}
