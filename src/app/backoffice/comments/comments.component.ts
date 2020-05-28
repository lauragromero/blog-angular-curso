import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommentStoreService } from '../comment-store.service';
import { Comment } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {

  @Input () comment: Comment;
  updateCommentForm: FormGroup;
  subDeleteComment: Subscription;
  subUpdateComment: Subscription;
  show: boolean;

  constructor( private service: PostService, private store: CommentStoreService) {
    this.updateCommentForm = new FormGroup({
      username: new FormControl ('', Validators.required),
      nickname : new FormControl ('', Validators.required),
      comment: new FormControl ('', Validators.required),
    });
   }

  ngOnInit() {
    console.log(this.comment);
  }

  isShow(){
    this.show = !this.show;
  }
  deleteComment(idComment){
   this.store.delete$(idComment);
  }
  updateComment(idComment){
    this.subUpdateComment = this.service.updateComment(idComment, this.updateCommentForm.value).subscribe(res =>
      console.log('Update comment'));

  }


  ngOnDestroy() {
    if (this.subDeleteComment){
      this.subDeleteComment.unsubscribe();
    }
    if (this.subUpdateComment){
      this.subUpdateComment.unsubscribe();
    }

}
}
