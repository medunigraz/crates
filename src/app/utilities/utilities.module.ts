import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadService } from './api.service';
import { TaskService } from './task.service';
import { ContentTypeService } from './content-type.service';
import { NotificationService } from './notification.service';

import { FileSizePipe } from './filesize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FileSizePipe
  ],
  exports: [
    FileSizePipe
  ],
  providers: [
    DownloadService,
    TaskService,
    ContentTypeService,
    NotificationService
  ]
})
export class UtilitiesModule { }
