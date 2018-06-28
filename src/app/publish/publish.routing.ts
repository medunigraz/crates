import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './root/root.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const publishRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
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
    RouterModule.forChild(publishRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PublishRoutingModule { }
