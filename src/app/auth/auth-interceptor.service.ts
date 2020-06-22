import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginProxyService } from './login-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private autService: LoginProxyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    let reqAuth = req;

    if (!req.url.includes('/login')){
      reqAuth = req.clone(
        {headers: req.headers.set('Authorization', 'Bearer ' + token)}
      );
    }

    return next.handle(reqAuth);
  }
}
