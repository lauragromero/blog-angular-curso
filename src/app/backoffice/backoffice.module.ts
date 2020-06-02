import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { AppPostComponent } from './app-post/app-post.component';
import { CommentsComponent } from './comments/comments.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';


const ROUTES: Routes = [
  {path: '', component: AppPostComponent,
    children: [
      {path: '', component: PostListComponent},
      {path: 'create', component: CreatePostComponent},
      {path: ':id', component: EditPostComponent},
  ]
}
];

@NgModule({
  declarations: [PostListComponent, CreatePostComponent, AppPostComponent, EditPostComponent, CommentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    FieldsetModule,
    RouterModule.forChild(ROUTES)
  ], exports: [PostListComponent, AppPostComponent, CreatePostComponent, EditPostComponent]
})
export class BackofficeModule { }
