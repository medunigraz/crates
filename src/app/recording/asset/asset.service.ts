import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APIClient, Item } from '../../utilities/api.service';

export interface Asset extends Item {
  recording: number | string;
  name: string;
  data: string;
  mimetype: string;
}

@Injectable()
export class AssetService extends APIClient<Asset> {

  path = 'video/recordingasset/';

  constructor(http: HttpClient) {
    super(http);
  }

}
