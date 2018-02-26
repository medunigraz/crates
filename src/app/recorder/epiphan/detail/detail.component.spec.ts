import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiphanDetailComponent } from './detail.component';

describe('EpiphanDetailComponent', () => {
  let component: EpiphanDetailComponent;
  let fixture: ComponentFixture<EpiphanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiphanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiphanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
