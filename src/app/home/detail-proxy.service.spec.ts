import { TestBed } from '@angular/core/testing';

import { DetailProxyService } from './detail-proxy.service';

describe('DetailProxyService', () => {
  let service: DetailProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
