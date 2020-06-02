import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';




@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule
  ], exports: [LoginComponent, LogoutComponent]
})
export class AuthModule { }
