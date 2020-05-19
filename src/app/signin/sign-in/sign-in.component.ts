import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
 signInForm: FormGroup;

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
    return this.service.createUser(this.signInForm.value).subscribe(res => {
      console.log('User added');
      this.router.navigateByUrl('/login');
    });
}


}
