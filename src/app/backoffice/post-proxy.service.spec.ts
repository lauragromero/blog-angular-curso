import { TestBed } from '@angular/core/testing';

import { PostProxyService } from './post-proxy.service';

describe('PostProxyService', () => {
  let service: PostProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
