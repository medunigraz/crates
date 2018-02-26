import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecorderComponent }    from './recorder.component';
import { EpiphanComponent }    from './epiphan/epiphan.component';
import { EpiphanDetailComponent }    from './epiphan/detail/detail.component';

const recorderRoutes: Routes = [
  {
    path: 'recorder',
    component: RecorderComponent,
    children: [
      {
        path: 'epiphan',
        component: EpiphanComponent
      },
      {
        path: 'epiphan/:id',
        component: EpiphanDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(recorderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecorderRoutingModule { }
