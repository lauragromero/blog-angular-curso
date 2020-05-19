import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SigninProxyService } from './signin-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private proxySignIn: SigninProxyService) { }

  createUser(body: object): Observable<any>{
    return this.proxySignIn.createUser(body);
  }
}

