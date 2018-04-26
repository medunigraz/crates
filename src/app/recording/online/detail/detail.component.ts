import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ReplaySubject, Subject } from 'rxjs/Rx';

import { RecordingService, Recording } from '../../recording.service';
import { ExportService, Export } from '../../export/export.service';
import { AssetService, Asset } from '../../asset/asset.service';

const sortAssets = (a, b) => {
  return a.name.localeCompare(b.name);
}

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public instance: Recording;
  public start: Date;
  public end: Date;
  public exporters: Export[];
  public assets: Asset[];
  public recordingRemoveModal: boolean = false;
  public assetUploadModal: boolean = false;
  public assetUploadQueue: any[];
  public removing: boolean = false;
  public uploading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordingService: RecordingService,
    private exportService: ExportService,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.assetUploadQueue = [];
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.recordingService.get(id).subscribe((recording) => {
        this.instance = recording;
        if (recording.start) {
          this.start = new Date(recording.start)
        }
        if (recording.end) {
          this.end = new Date(recording.end)
        }
        this.exportService.list().subscribe((exporters) => {
          this.exporters = exporters.results;
        });
        this.assetService.listAll({recording: id}).subscribe((assets) => {
          this.assets = assets.sort(sortAssets);
        });
      })
    });
  }

  dismiss() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  confirmRemoveRecording() {
    this.recordingRemoveModal = true;
  }

  removeRecording() {
    this.removing = true;
    this.recordingService.delete(this.instance).subscribe(() => {
      this.recordingRemoveModal = false;
      this.removing = false;
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  openUploadAsset() {
    this.assetUploadModal = true;
  }

  cancelUploadAsset() {
    if (this.uploading) {
      // TODO: Cancel all running uploads
      this.uploading = false;
    }
    this.assetUploadModal = false;
    this.assetUploadQueue.length = 0;
  }

  assetSelected(event) {
    if(event.target.files && event.target.files.length > 0) {
      for (let file of event.target.files) {
        file.upload = {
          sent: false,
          progress: 0
        };
        this.assetUploadQueue.push(file);
        console.log(file);
      }
    }
  }

  assetUpload() {
    this.uploading = true;
    this.assetUploadQueue.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const req = this.assetService.create({
          id: undefined,
          recording: this.instance.id,
          name: file.name,
          data: reader.result,
          mimetype: file.type
        })
        req.sent.subscribe((evt) => {
          file.upload.sent = true;
        });
        req.upload.subscribe((evt) => {
          console.log(evt);
          file.upload.progress = Math.round((evt.loaded / evt.total) * 100);
        });
        req.response.subscribe((asset) => {
          file.upload.progress = 100;
          this.assetUploadQueue = this.assetUploadQueue.filter((f) => {return f !== file; });
          this.assets = this.assets.concat(asset.body).sort(sortAssets);
          this.uploading = (this.assetUploadQueue.length > 0);
        });
      }
    });
  }

  assetRemove(asset) {
    const assets = new Set(this.assets);
    assets.delete(asset);
    this.assets = Array.from(assets).sort(sortAssets);
  }

}
