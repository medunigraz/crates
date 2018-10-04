import {
  HttpClient,
  HttpEventType,
  HttpHeaderResponse,
  HttpParams,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  empty,
  Observable
} from 'rxjs';
import {
  expand,
  filter,
  map,
  reduce,
  share
} from 'rxjs/operators';

export interface ListOptions {
  size?: number | string;
  offset?: number | string;
  filters?: any;
}

type Id = number | string;

export interface Item {
  id?: Id;
}

interface PaginatedResponse<T extends Item> {
  count: number;
  next: string | number | null;
  previous: string | number | null;
  results: T[];
}

interface EventResponse<T> {
  sent: Observable<HttpSentEvent>;
  upload: Observable<HttpProgressEvent>;
  headers: Observable<HttpHeaderResponse>;
  download: Observable<HttpProgressEvent>;
  response: Observable<HttpResponse<T>>;
}

@Injectable()
export class DownloadService {

  constructor(protected http: HttpClient) { }

  download(url: string) {
    const req = new HttpRequest<Blob>('GET', url, {
      reportProgress: true,
      responseType: 'blob'
    });
    const stream = this.http.request<Blob>(req).pipe(
      share()
    );
    const endpoints: EventResponse<Blob> = {
      sent: stream.pipe(
        filter((event) => { return event.type === HttpEventType.Sent; })
      ) as Observable<HttpSentEvent>,
      upload: stream.pipe(
        filter((event) => { return event.type === HttpEventType.UploadProgress; })
      ) as Observable<HttpProgressEvent>,
      headers: stream.pipe(
        filter((event) => { return event.type === HttpEventType.ResponseHeader; })
      ) as Observable<HttpHeaderResponse>,
      download: stream.pipe(
        filter((event) => { return event.type === HttpEventType.DownloadProgress; })
      ) as Observable<HttpProgressEvent>,
      response: stream.pipe(
        filter((event) => { return event.type === HttpEventType.Response; })
      ) as Observable<HttpResponse<Blob>>
    };
    return endpoints;
  }
}

@Injectable()
export abstract class APIClient<T extends Item> {

  protected path: string;

  constructor(protected http: HttpClient) { }

  list(options?: ListOptions) {
    let params = new HttpParams();
    if (options) {
      if (options.size) {
        params = params.append('limit', String(options.size));
      }
      if (options.offset) {
        params = params.append('offset', String(options.offset));
      }
      if (options.filters) {
        for (const f of Object.keys(options.filters)) {
          params = params.append(f, String(options.filters[f]));
        }
      }
    }
    return this.http.get<PaginatedResponse<T>>(this.path, { params: params });
  }

  listAll(filters: any) {

    const getRange = (offset?: number | string, limit?: number | string) => {
      // console.log(`loading items with range ${offset}:${limit}`);

      const options: ListOptions = {
        filters: filters
      };
      if (offset) {
        options.offset = offset;
      }
      if (limit) {
        options.size = limit;
      }

      return this.list(options);
    };

    return getRange().pipe(
      expand((res) => {
        // console.log(res);
        if (res.next) {
          const params = new URLSearchParams(res.next as string);
          return getRange(params.get('offset'), params.get('limit'));
        } else {
          return empty();
        }
      }),
      map((res) => {
        const items = res.results;
        // console.log(`received ${items.length}`);
        // console.log(JSON.stringify(items));
        return Array.prototype.concat.apply([], items.map(array => array));
      }),
      reduce((acc, x) => acc.concat(x), [])
    );
  }

  get(id: string | number) {
    return this.http.get<T>(`${this.path}${id}/`);
  }

  create(item: T) {
    const req = new HttpRequest<T>('POST', this.path, item, {
      reportProgress: true
    });
    const stream = this.http.request<T>(req).pipe(
      share()
    );
    const endpoints: EventResponse<T> = {
      sent: stream.pipe(
        filter((event) => { return event.type === HttpEventType.Sent; })
      ) as Observable<HttpSentEvent>,
      upload: stream.pipe(
        filter((event) => { return event.type === HttpEventType.UploadProgress; })
      ) as Observable<HttpProgressEvent>,
      headers: stream.pipe(
        filter((event) => { return event.type === HttpEventType.ResponseHeader; })
      ) as Observable<HttpHeaderResponse>,
      download: stream.pipe(
        filter((event) => { return event.type === HttpEventType.DownloadProgress; })
      ) as Observable<HttpProgressEvent>,
      response: stream.pipe(
        filter((event) => { return event.type === HttpEventType.Response; })
      ) as Observable<HttpResponse<T>>
    };
    return endpoints;
  }

  update(item: T) {
    const req = new HttpRequest<T>('PUT', `${this.path}${item.id}/`, item, {
      reportProgress: true
    });
    const stream = this.http.request<T>(req).pipe(
      share()
    );
    const endpoints: EventResponse<T> = {
      sent: stream.pipe(
        filter((event) => { return event.type === HttpEventType.Sent; })
      ) as Observable<HttpSentEvent>,
      upload: stream.pipe(
        filter((event) => { return event.type === HttpEventType.UploadProgress; })
      ) as Observable<HttpProgressEvent>,
      headers: stream.pipe(
        filter((event) => { return event.type === HttpEventType.ResponseHeader; })
      ) as Observable<HttpHeaderResponse>,
      download: stream.pipe(
        filter((event) => { return event.type === HttpEventType.DownloadProgress; })
      ) as Observable<HttpProgressEvent>,
      response: stream.pipe(
        filter((event) => { return event.type === HttpEventType.Response; })
      ) as Observable<HttpResponse<T>>
    };
    return endpoints;
  }

  delete(item: T) {
    return this.http.delete(`${this.path}${item.id}/`);
  }
}
