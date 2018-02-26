import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ClrDatagridStateInterface } from "@clr/angular";

import { EpiphanService, Epiphan } from './epiphan.service';

@Component({
  templateUrl: './epiphan.component.html',
  styleUrls: ['./epiphan.component.scss']
})
export class EpiphanComponent {

  public epiphans: Epiphan[];
  public total: number;
  public loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private epiphanService: EpiphanService
  ) { }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    const options = {
      size: state.page.size,
      offset: state.page.from
    };
    this.epiphanService.list(options).subscribe(response => {
      this.total = response.count;
      this.epiphans = response.results;
      this.loading = false;
    });
  }

  details(epiphan) {
    this.router.navigate(['./', epiphan.id], { relativeTo: this.route });
  }

}
