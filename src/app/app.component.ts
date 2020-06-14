import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserStoreService } from './auth/user-store.service';
import { User } from './auth/user.model';
import { NotificationBusService } from './bus.service';
import { Notificacion } from './Notificacion.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'blog-angular-curso';
  constructor(private notificacionesBus: NotificationBusService,
              private userStore: UserStoreService) { }


  msgs: Notificacion[] = [];
  notificacionesSub: Subscription;
  user$: Observable<User[]>;
  isUser: boolean;

  ngOnInit(): void  {
    this.userStore.init();
    this.user$ = this.userStore.get$();
    this.isLogin();
    this.notificacionesSub = this.notificacionesBus.getNotificacion().subscribe(
      (notification) => {
        this.msgs = [];
        this.msgs.push(notification);
      }
    );
  }

  isLogin(){
      this.isUser = true;
      this.user$.subscribe(res => {
        console.log(res);
      }
      );
  }

}
