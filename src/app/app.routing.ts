import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';


export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'recording',
        loadChildren: './recording/recording.module#RecordingModule'
      },
      {
        path: 'recorder',
        loadChildren: './recorder/recorder.module#RecorderModule'
      },
      {
        path: 'publish',
        loadChildren: './publish/publish.module#PublishModule'
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(
  ROUTES,
  {
    enableTracing: false,
    /*preloadingStrategy: PreloadAllModules*/
  }
);
