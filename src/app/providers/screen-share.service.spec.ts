import { TestBed, inject } from '@angular/core/testing';

import { ScreenShareService } from './screen-share.service';

describe('ScreenShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenShareService]
    });
  });

  it('should be created', inject([ScreenShareService], (service: ScreenShareService) => {
    expect(service).toBeTruthy();
  }));
});
