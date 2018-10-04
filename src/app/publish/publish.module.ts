import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { UtilitiesModule } from '../utilities/utilities.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RootComponent } from './root/root.component';

import { PublishRoutingModule } from './publish.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilitiesModule,
    PublishRoutingModule
  ],
  declarations: [
    RootComponent,
    DashboardComponent
  ],
  providers: [
  ]
})
export class PublishModule { }
