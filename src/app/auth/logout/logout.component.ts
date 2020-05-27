import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private route: Router) { }

  ngOnInit() {
  }
  onLogout() {
    console.log('hola');
    localStorage.removeItem('token');
    localStorage.clear();
    this.route.navigate(['login']);

  }

}
