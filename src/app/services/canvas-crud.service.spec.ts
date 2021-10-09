import { TestBed } from '@angular/core/testing';

import { CanvasCrudService } from './canvas-crud.service';

describe('CanvasCrudService', () => {
  let service: CanvasCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
