import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { LoginAuthService } from './login-auth.service';



const ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'login', component: LoginComponent},
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
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    AuthModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
