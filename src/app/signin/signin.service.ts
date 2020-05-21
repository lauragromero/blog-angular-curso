import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SigninProxyService } from './signin-proxy.service';
import { UserDTO } from './user-dto';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private proxySignIn: SigninProxyService) { }

  createUser(body: UserDTO): Observable<UserDTO>{
    return this.proxySignIn.createUser(body);
  }
}

