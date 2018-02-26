import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/takeWhile";

import { ExportService } from './export.service';
import { TaskService, Task } from '../../utilities/task.service';

@Component({
  selector: 'recording-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
  host: {
    class: 'col-xs-12 col-md-3'
  }
})
export class ExportComponent implements OnInit {

  @Input() exporter: any;
  @Input() recording: any;

  public progress$ = new ReplaySubject(1);
  private running: boolean = false;
  private runStates = [
    'PENDING',
    'STARTED',
    'PROGRESS'
  ];
  private endStates = [
    'SUCCESS',
    'FAILURE',
    'REVOKED',
    'RETRY'
  ];

  constructor(
    private exportService: ExportService,
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.running = true;
  }

  ngOnDestroy() {
    console.log('Destroy ExportComponent');
    this.running = false;
  }

  sendRequest() {
    const request = this.exportService.schedule(this.exporter.id, this.recording.id)
      .switchMap((data) => {
        return Observable.timer(0, 1000).switchMap(() => this.taskService.get(data.task));
      }).takeWhile(() => this.running).share();
    const state = request.multicast(
      () => new ReplaySubject(1),
      (states) => states.takeWhile((data: Task) => { console.log(data); return !this.endStates.includes(data.state)}).concat(states.take(1))
    ).share();
    // takeUntil(request.filter(data => this.endStates.includes(data.state))).share();
    state.filter((data: Task) => this.runStates.includes(data.state)).subscribe(this.progress$);
    state.filter((data: Task) => this.endStates.includes(data.state)).subscribe(this.progress$);
    state.subscribe(data => console.log(data));
  }

}
