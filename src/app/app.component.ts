import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

import { auth } from 'environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
      private router: Router,
      private oauthService: OAuthService
    ) {
        this.oauthService.configure(auth);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();
        this.oauthService.tryLogin();
        if (!this.oauthService.hasValidAccessToken()) {
            // this.oauthService.initImplicitFlow();
        }
    }

}
