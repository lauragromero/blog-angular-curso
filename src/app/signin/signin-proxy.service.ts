import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserDTO } from './user-dto';

@Injectable({
  providedIn: 'root'
})
export class SigninProxyService {

  constructor(private httpClient: HttpClient) { }

  createUser(body: UserDTO): Observable<UserDTO>{
    return this.httpClient.post<UserDTO>('http://localhost:3002/user', body); }


  }
