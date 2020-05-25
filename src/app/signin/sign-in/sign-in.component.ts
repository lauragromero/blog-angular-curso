import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
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
               private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl (''),
      nickname: new FormControl (''),
      password : new FormControl ('')
    });
  }

  createUser(){
    this.sub = this.service.createUser(this.signInForm.value).subscribe(res => {
      console.log('User added');
      this.router.navigateByUrl('/login');
      console.log(res);
    }, err => {
      this.error = err;
      console.log('Usuario ya registrado');
    });
  }

  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

}
