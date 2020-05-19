import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenDTO } from './auth-dto';
import { LoginProxyService } from './login-proxy.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private proxy: LoginProxyService,
              private router: Router, ) { }

  login(username: string, password: string): void{

    this.proxy.login(username, password).subscribe(
    (tokenDTO: TokenDTO) => {
      localStorage.setItem('token', tokenDTO.token);
      this.router.navigateByUrl ('/admin');
    },
    (error) => console.log(error)
   );

}
}
