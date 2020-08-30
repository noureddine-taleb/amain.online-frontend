import { TestBed } from '@angular/core/testing';

import { SeoAlertService } from './alert-service-seo.service';

describe('SeoAlertService', () => {
  let service: SeoAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
