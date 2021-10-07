import { TestBed } from '@angular/core/testing';

import { FabiricService } from './fabiric.service';

describe('FabiricService', () => {
  let service: FabiricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabiricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
