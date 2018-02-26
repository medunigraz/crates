import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordingComponent } from './recording.component';
import { OnlineComponent } from './online/online.component';
import { DetailComponent } from './online/detail/detail.component';

const recordingRoutes: Routes = [
  {
    path: 'recording',
    component: RecordingComponent,
    children: [
      {
        path: 'online/:id',
        component: DetailComponent,
      },
      {
        path: 'online',
        component: OnlineComponent,
      },
      /*
      {
        path: 'archive',
          component: ArchiveComponent,
          children: [
            {
              path: ':id',
              component: DetailComponent
            }
          ]
      }
       */
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
