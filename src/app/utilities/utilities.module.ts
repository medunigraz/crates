import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DownloadService } from './api.service';
import { ContentTypeService } from './content-type.service';
import { NotificationService } from './notification.service';
import { TaskService } from './task.service';

import { FileSizePipe } from './filesize.pipe';
import { ReadableTimePipe } from './readabletime.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FileSizePipe,
    ReadableTimePipe
  ],
  exports: [
    FileSizePipe,
    ReadableTimePipe
  ],
  providers: [
    DownloadService,
    TaskService,
    ContentTypeService,
    NotificationService
  ]
})
export class UtilitiesModule { }
