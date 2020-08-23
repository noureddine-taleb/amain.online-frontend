import { TestBed } from '@angular/core/testing';

import { LazyLoadResourcesService } from './lazy-load-resources.service';

describe('LazyLoadResourcesService', () => {
  let service: LazyLoadResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyLoadResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
