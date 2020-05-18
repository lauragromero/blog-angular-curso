import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    console.log(token);
    const reqAuth = req.clone(
      {headers: req.headers.set('Authorization', 'Bearer ' + token)}
    );
    console.log(reqAuth);
    return next.handle(reqAuth);
  }
}
