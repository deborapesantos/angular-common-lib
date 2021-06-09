import { TestBed } from '@angular/core/testing';

import { HtModalService } from './ht-modal.service';

describe('HtModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HtModalService = TestBed.get(HtModalService);
    expect(service).toBeTruthy();
  });
});
