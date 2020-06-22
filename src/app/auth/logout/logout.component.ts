import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from '../user-store.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private route: Router,
               private userStore: UserStoreService) {
               }

  ngOnInit() {
  }
  onLogout() {
    this.userStore.logout$();
    this.route.navigate(['/']);
  }

}
