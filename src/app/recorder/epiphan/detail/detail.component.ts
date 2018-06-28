import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';

import "rxjs/add/operator/takeWhile";

import { EpiphanService, Epiphan } from '../epiphan.service';
import { ChannelService, Channel } from '../channel.service';
import { SourceService, Source } from '../source.service';
import { ContentTypeService, ContentType } from '../../../utilities/content-type.service';
import { NotificationService, Notification } from '../../../utilities/notification.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class EpiphanDetailComponent implements OnInit, OnDestroy {

  public instance: Epiphan;
  public channels: Channel[];
  public sources: Source[];
  public source: Source;
  public notification: Notification;
  public notificationReceived: boolean = false;
  public contentType: ContentType;
  private running: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private epiphanService: EpiphanService,
    private channelService: ChannelService,
    private sourceService: SourceService,
    private contentTypeService: ContentTypeService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const contentTypeOptions = {
        size: 1,
        filters: {
          app_label: 'video',
          model: 'epiphan',
        }
      };
      this.contentTypeService.list(contentTypeOptions).subscribe((contentTypes) => {
        this.contentType = contentTypes.results.pop();
        const notificationOptions = {
          size: 1,
          filters: {
            object_id: id,
            content_type: this.contentType.id,
          }
        };
        this.notificationService.list(notificationOptions).subscribe((notifications) => {
          if (notifications.count > 0) {
            this.notification = notifications.results.pop();
          }
          this.notificationReceived = true;
        });
      });
      this.epiphanService.get(id).subscribe((epiphan) => {
        this.running = true;
        this.instance = epiphan;
        const options = {
          epiphan: this.instance.id
        }
        const timer = Observable.timer(0, 10000).takeWhile(() => this.running).share();
        timer.switchMap(() => {
          return this.channelService.listAll(options);
        }).subscribe((channels) => {
          console.log('channels', channels);
          this.channels = channels;
        });
        timer.switchMap(() => {
          return this.sourceService.listAll(options);
        }).subscribe((sources) => {
          console.log('sources', sources);
          this.sources = sources;
        });
      })
    });
  }

  toggleNotification() {
    if (this.notification) {
      this.notificationService.delete(this.notification).subscribe(() => {
        this.notification = undefined;
      });
    } else {
      this.notificationService.create({
        object_id: this.instance.id,
        content_type: this.contentType.id,
      }).response.subscribe((notification) => {
        this.notification = notification.body;
      })
    }
  }

  toggleChannelRecording(channel: Channel) {
    console.log(channel);
    if (channel.recording) {
      // this.channelService.stop(channel).subscribe((channel) => {
      // });
    } else {
      // this.channelService.start(channel).subscribe((channel) => {
      // });
    }
  }

  ngOnDestroy() {
    this.running = false;
  }

  dismiss() {
    this.running = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  showSourceModal(source: Source) {
    this.source = source;
  }

}
