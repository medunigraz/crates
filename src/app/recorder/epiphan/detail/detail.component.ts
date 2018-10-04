import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import {
  timer
} from 'rxjs';
import {
  share,
  switchMap,
  takeWhile
} from 'rxjs/operators';

import { ContentType, ContentTypeService } from '../../../utilities/content-type.service';
import { Notification, NotificationService } from '../../../utilities/notification.service';
import { Channel, ChannelService } from '../channel.service';
import { Epiphan, EpiphanService } from '../epiphan.service';
import { Source, SourceService } from '../source.service';

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
  public channelsDirty: boolean = true;

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
        const t = timer(0, 10000).pipe(
          takeWhile(() => this.running),
          share()
        );
        t.pipe(
          switchMap(() => {
            return this.channelService.listAll(options);
          })
        ).subscribe((channels) => {
          console.log('channels', channels);
          this.channels = channels;
          this.channelsDirty = false;

        });
        t.pipe(
          switchMap(() => {
            return this.sourceService.listAll(options);
          })
        ).subscribe((sources) => {
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

  stopChannelRecording(channel: Channel) {
    this.channelsDirty = true;
    this.channelService.stop(channel).subscribe((c) => {
      console.log('Stopping channel', c);
    });
  }

  startChannelRecording(channel: Channel) {
    this.channelsDirty = true;
    this.channelService.start(channel).subscribe((c) => {
      console.log('Starting channel', c);
    });
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
