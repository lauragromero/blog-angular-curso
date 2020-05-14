import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePostComponent } from './home-post/home-post.component';

const ROUTES: Routes = [
  {path: '', component: HomePostComponent}
];

@NgModule({
  declarations: [HomePostComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ], exports: [HomePostComponent]
})
export class HomeModule { }
