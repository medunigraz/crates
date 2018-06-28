import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { UtilitiesModule } from '../utilities/utilities.module';

import { RecordingRouting } from './recording.routing';

import { RecordingService } from './recording.service';
import { AssetService } from './asset/asset.service';
import { ExportService } from './export/export.service';

import { RootComponent } from './root/root.component';
import { OnlineComponent } from './online/online.component';
import { DetailComponent } from './online/detail/detail.component';
import { ExportComponent } from './export/export.component';
import { AssetComponent } from './asset/asset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { ArchiveDetailComponent } from './archive/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilitiesModule,
    RecordingRouting
  ],
  declarations: [
    RootComponent,
    OnlineComponent,
    DetailComponent,
    ExportComponent,
    AssetComponent,
    DashboardComponent,
    ArchiveComponent,
    ArchiveDetailComponent
  ],
  providers: [
    RecordingService,
    ExportService,
    AssetService
  ]
})
export class RecordingModule { }
