import { TestBed } from '@angular/core/testing';

import { SigninProxyService } from './signin-proxy.service';

describe('SigninProxyService', () => {
  let service: SigninProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
