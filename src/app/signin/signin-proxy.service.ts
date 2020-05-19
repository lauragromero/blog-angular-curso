import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SigninProxyService {

  constructor(private httpClient: HttpClient) { }

  createUser(body: object): Observable<any>{
    return this.httpClient.post('http://localhost:3002/user', body); }


  }
