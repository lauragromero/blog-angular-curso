import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { HomeModule } from './home/home.module';
import { LoginAuthService } from './login-auth.service';
import { SignInComponent } from './signin/sign-in/sign-in.component';
import { SigninModule } from './signin/signin.module';



const ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'admin',
    loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule),  canActivate: [LoginAuthService] },
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastModule,
    ButtonModule,
    MenubarModule,
    HomeModule,
    AuthModule,
    SigninModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
