import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { UserDTO } from './user-dto';

@Injectable({
  providedIn: 'root'
})
export class SigninProxyService {

  constructor(private httpClient: HttpClient) { }

  createUser(body: UserDTO): Observable<UserDTO>{
    return this.httpClient.post<UserDTO>('http://localhost:3002/user', body)
    .pipe(
      catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     }else{
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
    return throwError(errorMessage);
  }

  }
