import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationBusService } from '../bus.service';
import { TokenDTO } from './auth-dto';
import { LoginProxyService } from './login-proxy.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenDTO: Observable<TokenDTO>;

  constructor(private proxy: LoginProxyService,
              private router: Router, private notificacionBus: NotificationBusService) { }

  login(username: string, password: string){
    this.proxy.login(username, password).subscribe(
    (tokenDTO: TokenDTO) => {
      localStorage.setItem('token', tokenDTO.token);
      this.router.navigateByUrl ('/admin');
    },
    (error) => {
      console.log(error);
      this.notificacionBus.showError('Usuario o contraseña erroneas'); }
   );

}
}
