import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenDTO } from './auth-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<TokenDTO>{
    console.log(username, password, 'proxyLogin');
    const auth = 'Basic ' + btoa(username + ':' + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'basic' + auth
      })
    };
    return this.httpClient.post<TokenDTO>('http://localhost:3002/login', '', httpOptions);
  }
}
