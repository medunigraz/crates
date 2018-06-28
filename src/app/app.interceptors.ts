import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from 'environments/environment';

@Injectable()
export class BaseInterceptor {
  private absolute = new RegExp('^(?:[a-z]+:)?//', 'i');

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.absolute.test(req.url)) {
      return next.handle(req);
    }
    const baseReq = req.clone(
      {
        url: `${environment.apiURL}${req.url}`
      }
    );
    return next.handle(baseReq);
  }
}

@Injectable()
export class AuthInterceptor {
constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.injector.get(OAuthService).getAccessToken();
    const authReq = req.clone(
        {
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        }
    );
    return next.handle(authReq);
  }
}
