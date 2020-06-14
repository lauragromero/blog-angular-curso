import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { NotificationBusService } from '../bus.service';
import { Store } from '../store';
import { LoginService } from './login.service';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserStoreService  extends Store<User[]> {

  users = [];

  constructor(private service: LoginService,
              private notificacionBus: NotificationBusService) {
    super();
   }

   init(): void{
    const token = localStorage.getItem('token');
    if (token) {
            const decode = jwt_decode(token);
            const u = {
              username: decode.user,
              nickname: decode.nickname,
              role: decode.role,
              _id: decode.id,
            };
            this.store([...this.users, u]);
      }
  }

  login$(user){
    this.service.login(user).toPromise()
    .catch(err => {
      this.notificacionBus.showError('Username or passwor wrong'); });
    const u = Object.assign({}, user);
    const usersNew = [...this.users, u];
    console.log(usersNew);
    this.store([...this.users, u]);
  }

  logout$() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.store([]);
  }
}
