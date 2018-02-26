import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
  host: {
    class: 'content-container'
  }
})
export class RecorderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.router.navigate(['./', 'epiphan'], { relativeTo: this.route });
  }

}
