import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIClient, Item } from '../../utilities/api.service';

export interface Epiphan extends Item {
  name: string;
  hostname: string;
  room: any;
  retention: string;
  online: boolean;
  provision: boolean;
}
@Injectable()
export class EpiphanService extends APIClient<Epiphan> {

  constructor(http: HttpClient) {
    super(http);
  }

  path = 'video/epiphan/';

}
