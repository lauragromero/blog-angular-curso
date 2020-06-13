import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotificationBusService } from 'src/app/bus.service';
import { SigninService } from '../signin.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
 signInForm: FormGroup;
 sub: Subscription;
 error: string;

  constructor( private service: SigninService,
               private router: Router,
               private notificacionBus: NotificationBusService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl ('', Validators.required),
      nickname: new FormControl ('', Validators.required),
      password : new FormControl ('', [ Validators.required, Validators.minLength(4)])
    });
  }

  createUser(){
    this.sub = this.service.createUser(this.signInForm.value).subscribe(res => {
      console.log('User added');
      this.router.navigateByUrl('/login');
    }, err => {this.notificacionBus.showError(err.error.message);

    });
  }


  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

}
