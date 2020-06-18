import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserStoreService } from 'src/app/auth/user-store.service';
import { User } from 'src/app/auth/user.model';
import { NotificationBusService } from 'src/app/bus.service';
import { CommentStoreService } from '../comment-store.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{

  @Input () comments: Comment[];
  @Input () postUsername: string;
  updateCommentForm: FormGroup;
  show: boolean;
  cols: any[];
  customErrorsMessages: {};
  user: Observable<User[]>;
  id: string;

  constructor(private store: CommentStoreService,
              private notificacionBus: NotificationBusService,
              private userStore: UserStoreService,
              private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.user = this.userStore.get$();
    console.log(this.postUsername);
    this.updateCommentForm = new FormGroup({
      comment: new FormControl ('', Validators.required),
    });
    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'date', header: 'Date'},
      { field: 'comment', header: 'Comment' },
    ];
    this.customErrorsMessages = {
      required: 'This field must not be empty',
    };
  }

  deleteComment(idComment){
    this.store.delete$(idComment)
    .then(() => {
      this.notificacionBus.showSuccess('Comment has been deleted'); })
    .catch(err => {
      this.notificacionBus.showError('Can not deleted this comment'); });
  }

  updateComment(idComment){
    const updateValue = this.updateCommentForm.value;
    this.store.update$(idComment, updateValue)
    .then(() => {
      this.notificacionBus.showSuccess('Comment has been update');
      this.updateCommentForm.reset(); })
    .catch(err => {
      this.notificacionBus.showError('Can not modify this comment'); });

  }
}
