import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotificationBusService } from 'src/app/bus.service';
import { LoginService } from '../login.service';
import { UserStoreService } from '../user-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  logingForm: FormGroup;
  signInForm: FormGroup;
  sub: Subscription;
  error: string;
  isSignin: boolean;
  customErrorsMessages: {};

  constructor(
    private service: LoginService,
    private store: UserStoreService,
    private notificacionBus: NotificationBusService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.init();
    this.isSignin = true;
    this.logingForm = new FormGroup({
      username: new FormControl ('',  Validators.required),
      password : new FormControl ('', [ Validators.required, Validators.minLength(4)])
    });
    this.signInForm = new FormGroup({
      username: new FormControl ('', Validators.required),
      nickname: new FormControl ('', Validators.required),
      password : new FormControl ('', [ Validators.required, Validators.minLength(4)])
    });
    this.customErrorsMessages = {
      required: 'This field must not be empty',
      minLength: 'Sorry, this field is too short',
    };
  }

  login(){
    this.router.navigateByUrl('/admin');
    this.store.login$(this.logingForm.value);

  }
  createUser(){
    this.sub = this.service.createUser(this.signInForm.value).subscribe(res => {
      this.isSignin = false;
    }, err => {
      this.signInForm.reset();
      this.notificacionBus.showError(err.error.message);

    });
  }

  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe();
    }
  }
  }

