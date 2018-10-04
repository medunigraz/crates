/* tslint:disable:no-unused-variable */

import { APP_BASE_HREF } from "@angular/common";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from "@clr/angular";
import { AboutComponent } from "./about/about.component";
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";

describe('AppComponent', () => {

    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AboutComponent,
                HomeComponent
            ],
            imports: [
                ClarityModule.forRoot(),
                ROUTING
            ],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}]
        });

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;


    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the app', async(() => {
        expect(compiled).toBeTruthy();
    }));


});
