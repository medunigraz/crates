import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent }    from './root/root.component';
import { DashboardComponent }    from './dashboard/dashboard.component';
import { EpiphanComponent }    from './epiphan/epiphan.component';
import { EpiphanDetailComponent }    from './epiphan/detail/detail.component';

const recorderRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'epiphan',
        component: EpiphanComponent
      },
      {
        path: 'epiphan/:id',
        component: EpiphanDetailComponent
      },
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
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
