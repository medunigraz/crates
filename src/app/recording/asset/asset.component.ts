import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DownloadService } from '../../utilities/api.service';
import { Asset, AssetService } from './asset.service';

@Component({
  selector: 'asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
    host: {
        class: 'card'
    }
})
export class AssetComponent implements OnInit, OnDestroy {

  @Input() instance: any;
  @Output() onDelete = new EventEmitter<Asset>();

  public assetRemoveModal: boolean = false;
  public downloading: boolean = false;
  public downloaded: boolean = false;
  public downloadProgress: number = 0;
  private objectURL: string;

  constructor(
    private assetService: AssetService,
    private downloadService: DownloadService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.objectURL) {
      console.log('destroy', this.objectURL);
      window.URL.revokeObjectURL(this.objectURL);
    }
  }

  private saveBlob() {
    const link = document.createElement('a');
    link.href = this.objectURL;
    link.download = this.instance.name;
    // FIXME: Ugly hack required by Firefox. Chrome works without DOM-attachment
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  download() {
    if (this.objectURL) {
      this.saveBlob();
      return;
    }
    const req = this.downloadService.download(this.instance.data);
    req.sent.subscribe((evt) => {
      this.downloading = true;
    });
    req.download.subscribe((evt) => {
      this.downloadProgress = Math.round((evt.loaded / evt.total) * 100);
    });
    req.response.subscribe((evt) => {
      console.log(evt);
      this.downloadProgress = 100;
      this.downloaded = true;
      this.objectURL = window.URL.createObjectURL(evt.body);
      this.saveBlob();
    });
  }

  confirmRemoveAsset() {
    this.assetRemoveModal = true;
  }

  removeAsset() {
    this.assetService.delete(this.instance.id).subscribe(() => {
      this.onDelete.emit(this.instance);
      this.assetRemoveModal = false;
    });
  }

}
