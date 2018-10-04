import { inject, TestBed } from '@angular/core/testing';

import { EpiphanService } from './epiphan.service';

describe('EpiphanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpiphanService]
    });
  });

  it('should be created', inject([EpiphanService], (service: EpiphanService) => {
    expect(service).toBeTruthy();
  }));
});
