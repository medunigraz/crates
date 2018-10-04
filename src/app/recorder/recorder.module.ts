import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { UtilitiesModule } from '../utilities/utilities.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EpiphanDetailComponent } from './epiphan/detail/detail.component';
import { EpiphanComponent } from './epiphan/epiphan.component';
import { RootComponent } from './root/root.component';

import { ChannelService } from './epiphan/channel.service';
import { EpiphanService } from './epiphan/epiphan.service';
import { SourceService } from './epiphan/source.service';

import { RecorderRoutingModule } from './recorder.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilitiesModule,
    RecorderRoutingModule
  ],
  declarations: [
    RootComponent,
    DashboardComponent,
    EpiphanComponent,
    EpiphanDetailComponent
  ],
  providers: [
    EpiphanService,
    ChannelService,
    SourceService
  ]
})
export class RecorderModule { }
