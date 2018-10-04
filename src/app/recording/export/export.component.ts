import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  timer,
  ReplaySubject
} from 'rxjs';
import {
  concat,
  filter,
  multicast,
  share,
  switchMap,
  take,
  takeWhile
} from 'rxjs/operators';

import { Task, TaskService } from '../../utilities/task.service';
import { ExportService } from './export.service';

@Component({
  selector: 'recording-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'col-xs-12 col-md-3';

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
    const request = this.exportService.schedule(this.exporter.id, this.recording.id).pipe(
      switchMap((data) => {
        return timer(0, 1000).pipe(
          switchMap(() => this.taskService.get(data.task))
        );
      }),
      takeWhile(() => this.running),
      share()
    );
    const state = request.pipe(
      multicast(
        () => new ReplaySubject(1),
        (states) => states.pipe(
          takeWhile((data: Task) => {
            console.log(data);
            return !this.endStates.includes(data.state)
          }),
          concat(states.pipe(
            take(1)
          ))
        )
      ),
      share()
    );
    // takeUntil(request.filter(data => this.endStates.includes(data.state))).share();
    state.pipe(
      filter((data: Task) => this.runStates.includes(data.state))
    ).subscribe(this.progress$);
    state.pipe(
      filter((data: Task) => this.endStates.includes(data.state))
    ).subscribe(this.progress$);
    state.subscribe(data => console.log(data));
  }

}
