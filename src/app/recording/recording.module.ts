import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { UtilitiesModule } from '../utilities/utilities.module';

import { RecordingRouting } from './recording.routing';

import { RecordingService } from './recording.service';
import { AssetService } from './asset/asset.service';
import { ExportService } from './export/export.service';

import { RecordingComponent } from './recording.component';

import { OnlineComponent } from './online/online.component';
import { DetailComponent } from './online/detail/detail.component';
import { ExportComponent } from './export/export.component';
import { AssetComponent } from './asset/asset.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilitiesModule,
    RecordingRouting
  ],
  declarations: [
    RecordingComponent,
    OnlineComponent,
    DetailComponent,
    ExportComponent,
    AssetComponent
  ],
  providers: [
    RecordingService,
    ExportService,
    AssetService
  ]
})
export class RecordingModule { }
