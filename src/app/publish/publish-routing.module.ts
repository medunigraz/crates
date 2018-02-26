import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublishComponent }    from './publish.component';

const publishRoutes: Routes = [
  {
      path: 'publish',
      component: PublishComponent,
      children: [ ]
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
