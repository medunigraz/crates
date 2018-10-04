import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APIClient, Item } from '../utilities/api.service';

export interface Recording extends Item {
  created: Date;
  online: string;
  info: any;
  recorder: any;
  metadata?: any;
  start?: string;
  end?: string;
  course?: any | null;
  presenter?: any | null;
}

@Injectable()
export class RecordingService extends APIClient<Recording> {

  path = 'video/recording/';

  constructor(http: HttpClient) {
    super(http);
  }

}
