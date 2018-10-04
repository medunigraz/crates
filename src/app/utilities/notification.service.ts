import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { APIClient, Item } from './api.service';

export interface Notification extends Item {
  object_id: string | number;
  content_type: string | number;
}

@Injectable()
export class NotificationService extends APIClient<Notification> {

  constructor(http: HttpClient) {
    super(http);
  }

  path = 'base/notification/';

}
