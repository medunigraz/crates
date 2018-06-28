import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';

import { OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';

import { auth } from 'environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(
      private oauthService: OAuthService
  ) { }

  isAuthenticated() {
    this.oauthService.configure(auth);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.tryLogin();
    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initImplicitFlow();
      return false;
    }
    return true;
  }
  canActivate() {
    console.log('canActivate');
    return this.isAuthenticated();
  }
  canActivateChild() {
    console.log('canActivateChild');
    return this.isAuthenticated();
  }
  canLoad() {
    console.log('canLoad');
    return this.isAuthenticated();
  }

}
