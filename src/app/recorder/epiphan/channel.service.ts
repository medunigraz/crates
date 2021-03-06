import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APIClient, Item } from '../../utilities/api.service';

export interface Channel extends Item {
  recording: boolean;
  name: string;
  path: any;
  epiphan: number;
}

@Injectable()
export class ChannelService extends APIClient<Channel> {

  constructor(http: HttpClient) {
    super(http);
  }

  path = 'video/epiphanchannel/';

  start(channel: Channel) {
    const req = new HttpRequest<Channel>('START', `${this.path}${channel.id}/control/`, null);
    return this.http.request<Channel>(req);
  }

  stop(channel: Channel) {
    const req = new HttpRequest<Channel>('STOP', `${this.path}${channel.id}/control/`, null);
    return this.http.request<Channel>(req);
  }

}
