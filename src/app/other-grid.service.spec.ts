import { TestBed } from '@angular/core/testing';

import { OtherGridService } from './other-grid.service';

describe('OtherGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherGridService = TestBed.get(OtherGridService);
    expect(service).toBeTruthy();
  });
});
