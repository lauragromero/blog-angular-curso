import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationBusService } from './bus.service';
import { Notificacion } from './Notificacion.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'blog-angular-curso';
  constructor(private notificacionesBus: NotificationBusService) { }


  msgs: Notificacion[] = [];
  notificacionesSub: Subscription;

  ngOnInit(): void  {
    this.notificacionesSub = this.notificacionesBus.getNotificacion().subscribe(
      (notification) => {
        this.msgs = [];
        this.msgs.push(notification);
      }
    );
  }

}
