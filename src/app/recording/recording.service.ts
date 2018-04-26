import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIClient, Item } from '../utilities/api.service';

export interface Recording extends Item {
  created: Date;
  data: string;
  info: any;
  recorder: any;
  metadata?; any;
  start?: string;
  end?: string;
  course?: any | null;
  presenter?: any | null;
}

@Injectable()
export class RecordingService extends APIClient<Recording> {

  constructor(http: HttpClient) {
    super(http);
  }

  path = 'video/recording/';

}
