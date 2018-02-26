import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ClrDatagridStateInterface } from "@clr/angular";

import { RecordingService, Recording } from '../recording.service';

@Component({
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent {

  public loading: boolean = false;
  public total: number = 0;
  public recordings: Recording[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public recordingService: RecordingService,
  ) { }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    const filters:{[prop:string]: any[]} = {};
    if (state.filters) {
      for (let filter of state.filters) {
        let {property, value} = <{property: string, value: string}>filter;
        filters[property] = [value];
      }
    }
    const options = {
      size:  state.page.size,
      offset: state.page.from,
      filters: filters,
    }
    this.recordingService.list(options).subscribe((result) => {
      this.recordings = result.results;
      this.total = result.count;
      this.loading = false;
    });

  }

  details(recording: Recording) {
    this.router.navigate(['./', recording.id], { relativeTo: this.route });
  }

}
