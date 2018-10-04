import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { UtilitiesModule } from '../utilities/utilities.module';

import { RecordingRouting } from './recording.routing';

import { AssetService } from './asset/asset.service';
import { ExportService } from './export/export.service';
import { RecordingService } from './recording.service';

import { ArchiveComponent } from './archive/archive.component';
import { ArchiveDetailComponent } from './archive/detail/detail.component';
import { AssetComponent } from './asset/asset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExportComponent } from './export/export.component';
import { DetailComponent } from './online/detail/detail.component';
import { OnlineComponent } from './online/online.component';
import { RootComponent } from './root/root.component';

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
