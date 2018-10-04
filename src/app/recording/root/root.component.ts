import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  host: {
    class: 'content-container'
  }
})
export class RootComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    /*
    console.log('router', this.route);
    console.log('route', this.route);
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('params', params);
      const id = params.get('id');
      console.log('online nginit id', id);
      if (!id) {
        console.log('routing because of missing id');
        // this.router.navigate(['./', 'online'], { relativeTo: this.route });
      }
    });
    */
  }

}
