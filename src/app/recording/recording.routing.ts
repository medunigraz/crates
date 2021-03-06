import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArchiveComponent } from './archive/archive.component';
import { ArchiveDetailComponent } from './archive/detail/detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './online/detail/detail.component';
import { OnlineComponent } from './online/online.component';
import { RootComponent } from './root/root.component';

const recordingRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'online/:id',
        component: DetailComponent,
      },
      {
        path: 'online',
        component: OnlineComponent,
      },
      {
        path: 'archive',
          component: ArchiveComponent,
          children: [
            {
              path: ':id',
              component: ArchiveDetailComponent
            }
          ]
      },
      {
        path: '',
        component: DashboardComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(recordingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecordingRouting { }
