import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiphanComponent } from './epiphan.component';

describe('EpiphanComponent', () => {
  let component: EpiphanComponent;
  let fixture: ComponentFixture<EpiphanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiphanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiphanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
