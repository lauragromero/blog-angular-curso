import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { HomePostComponent } from './home-post/home-post.component';

const ROUTES: Routes = [
  {path: '', component: AppHomeComponent,
    children: [
      {path: 'home', component: HomePostComponent},
      {path: 'home/:id', component: DetailPostComponent}
  ]}];


@NgModule({
  declarations: [HomePostComponent, DetailPostComponent, AppHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ], exports: [AppHomeComponent, HomePostComponent, DetailPostComponent]
})
export class HomeModule { }
