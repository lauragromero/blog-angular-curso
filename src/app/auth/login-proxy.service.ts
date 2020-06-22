import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenDTO } from './auth-dto';
import { UserDTO } from './user-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  login(user): Observable<TokenDTO>{
    console.log(user);
    console.log(user.username, user.password, 'proxyLogin');
    const auth = 'Basic ' + btoa(user.username + ':' + user.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'basic' + auth
      })
    };
    return this.httpClient.post<TokenDTO>('http://localhost:3002/login', '', httpOptions);
  }

  createUser(body: UserDTO): Observable<UserDTO>{
    console.log(body);
    return this.httpClient.post<UserDTO>('http://localhost:3002/user', body);
  }
}
