import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  id: number;
  subUpdate: Subscription;
  subAddComment: Subscription;
  subDeleteComment: Subscription;
  subUpdateComment: Subscription;
  post$: Observable<Post>;
  updateForm: FormGroup;
  commentForm: FormGroup;
  updateCommentForm: FormGroup;
  isEdit: boolean;
  isAdded: boolean;
  isUpdate: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.isEdit = false;
    this.isAdded = false;
    this.isUpdate = false;
    this.id = this.activatedRoute.snapshot.params.id;
    this.post$ = this.service.getPostById(this.id);
    this.updateForm = new FormGroup({
      username: new FormControl (''),
      nickname : new FormControl (''),
      title : new FormControl (''),
      text : new FormControl ('')
    });
    this.commentForm = new FormGroup({
      username: new FormControl (''),
      nickname : new FormControl (''),
      comment: new FormControl (''),
    });
    this.updateCommentForm = new FormGroup({
      username: new FormControl (''),
      nickname : new FormControl (''),
      comment: new FormControl (''),
    });

  }
  commentAdd(){
    this.isAdded = true;
  }
  editPost(){
    this.isEdit = true;
  }
  isUpdateComment(){
    this.isUpdate = true;
  }
  updatePost(){
    this.subUpdate = this.service.updatePost(this.id, this.updateForm.value).subscribe(res =>
    console.log('post actualizado', res));
    console.log(this.updateForm.value);
  }

  addComment(){
    this.subAddComment = this.service.addComment(this.id, this.commentForm.value).subscribe(res =>
      console.log('comentario añadido', res));
  }

  deleteComment(idComment){
    this.subDeleteComment = this.service.deleteComment(idComment).subscribe(res =>
      console.log('comentario eliminado'));

  }
  updateComment(idComment){
    this.subUpdateComment = this.service.updateComment(idComment, this.updateCommentForm.value).subscribe(res =>
      console.log('Update comment', res));

  }

  ngOnDestroy() {
    if (this.subUpdate){
      this.subUpdate.unsubscribe();
    }
    if (this.subAddComment){
      this.subAddComment.unsubscribe();
    }
    if (this.subDeleteComment){
      this.subDeleteComment.unsubscribe();
    }
    if (this.subUpdateComment){
      this.subUpdateComment.unsubscribe();
    }

}
}
