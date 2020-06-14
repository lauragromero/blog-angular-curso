import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { NotificationBusService } from '../bus.service';
import { TokenDTO } from './auth-dto';
import { LoginProxyService } from './login-proxy.service';
import { UserDTO } from './user-dto';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenDTO: Observable<TokenDTO>;

  constructor(private proxy: LoginProxyService,
              private router: Router,
              private notificacionBus: NotificationBusService) { }

  login(user: object): Observable<TokenDTO>{
    return this.proxy.login(user).pipe(
    map((tokenDTO: TokenDTO) => {
      localStorage.setItem('token', tokenDTO.token);
      this.router.navigateByUrl ('/admin');
      const decodeToken = jwt_decode(tokenDTO.token);
      return decodeToken;
    })
   );

  }
  createUser(body: User): Observable<User>{
    return this.proxy.createUser(this.adaptModelTODTO(body)).pipe(
      map((userDTO: UserDTO) => this.adaptDTOToModel(userDTO))
    );
  }

  private adaptDTOToModel(userDTO: UserDTO): User { return {
    username: userDTO.username,
    nickname: userDTO.nickname,
    password: userDTO.password,
    role: userDTO.role,
    _id: userDTO._id,
    }; }

  private adaptModelTODTO(user: User): UserDTO {
    return {
    username: user.username,
    nickname: user.nickname,
    password: user.password,
    role: user.role,
    _id: user._id,
    }; }
}
