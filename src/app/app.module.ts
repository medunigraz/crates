import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ClarityModule } from '@clr/angular';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';

import { BaseInterceptor, AuthInterceptor } from './app.interceptors';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RecordingModule }     from './recording/recording.module';
import { RecorderModule } from './recorder/recorder.module';
import { PublishModule } from './publish/publish.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    OAuthModule.forRoot(),
    RecordingModule,
    RecorderModule,
    PublishModule,
    ROUTING
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
