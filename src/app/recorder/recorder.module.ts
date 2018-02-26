import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { UtilitiesModule } from '../utilities/utilities.module';

import { RecorderComponent } from './recorder.component';
import { EpiphanComponent } from './epiphan/epiphan.component';
import { EpiphanDetailComponent } from './epiphan/detail/detail.component';

import { EpiphanService } from './epiphan/epiphan.service';
import { ChannelService } from './epiphan/channel.service';
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
    RecorderComponent,
    EpiphanComponent,
    EpiphanDetailComponent
  ],
  providers: [
    EpiphanService,
    ChannelService,
    SourceService,
  ]
})
export class RecorderModule { }
