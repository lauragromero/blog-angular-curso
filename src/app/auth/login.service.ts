import { Injectable } from '@angular/core';
import { TokenDTO } from './auth-dto';
import { LoginProxyService } from './login-proxy.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private proxy: LoginProxyService) { }

  login(username: string, password: string): void{
    console.log(username, password, 'loginService');
    this.proxy.login(username, password).subscribe(
    (tokenDTO: TokenDTO) => localStorage.setItem('token', tokenDTO.token),
    (error) => console.log(error));

}
}
