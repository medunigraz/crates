import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ClarityModule } from '@clr/angular';

import { UtilitiesModule } from '../utilities/utilities.module';

import { PublishComponent } from './publish.component';

import { PublishRoutingModule } from './publish-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilitiesModule,
    PublishRoutingModule
  ],
  declarations: [
    PublishComponent,
  ],
  providers: [
  ]
})
export class PublishModule { }
