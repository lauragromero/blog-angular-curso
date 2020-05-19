import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logingForm: FormGroup;
  constructor( private service: LoginService) { }

  ngOnInit(): void {
    this.logingForm = new FormGroup({
      username: new FormControl (''),
      password : new FormControl ('')
    });
  }

  login(){
    const username = this.logingForm.get('username').value;
    const password = this.logingForm.get('password').value;
    return this.service.login(username, password);

  }

}
