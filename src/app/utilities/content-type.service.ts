import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { APIClient, Item } from './api.service';

export interface ContentType extends Item {
  app_label: string;
  model: string;
}

@Injectable()
export class ContentTypeService extends APIClient<ContentType> {

  constructor(http: HttpClient) {
    super(http);
  }

  path = 'base/contenttype/';

}
