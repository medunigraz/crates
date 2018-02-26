import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIClient, Item } from '../../utilities/api.service';

export interface Source extends Item {
  number: number;
  video: string;
  audio: string;
  port: number;
  input: any;
  epiphan: number;
}

@Injectable()
export class SourceService extends APIClient<Source> {

  constructor(http: HttpClient) {
    super(http);
  }

  path = 'video/epiphansource/';

}
