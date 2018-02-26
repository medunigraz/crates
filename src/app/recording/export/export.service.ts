import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIClient, Item } from '../../utilities/api.service';

export interface Export extends Item {
  id: string;
  name: string;
}

interface ExportCreation {
  task: string;
}

@Injectable()
export class ExportService extends APIClient<Export> {

  path = 'video/exportclass/';

  constructor(http: HttpClient) {
    super(http);
  }

  schedule(exporter: string, recording: any) {
    return this.http.post<ExportCreation>(
      this.path,
      {
        exporter: exporter,
        recording: recording
      }
    );
  }

}
