import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationBusService } from 'src/app/bus.service';
import { CommentStoreService } from '../comment-store.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{

  @Input () comments: Comment[];
  updateCommentForm: FormGroup;
  show: boolean;
  cols: any[];

  constructor(private store: CommentStoreService,
              private notificacionBus: NotificationBusService){
    this.updateCommentForm = new FormGroup({
      comment: new FormControl ('', Validators.required),
    });

   }

  ngOnInit() {
    console.log(this.comments);
    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'date', header: 'Date'},
      { field: 'comment', header: 'Comment' },

    ];
  }

  deleteComment(idComment){
    this.store.delete$(idComment)
    .then(() => {
      this.notificacionBus.showSuccess('Comment has been deleted'); })
    .catch(err => {
      this.notificacionBus.showError(err); });
  }

  updateComment(idComment){
    const updateValue = this.updateCommentForm.value;
    this.store.update$(idComment, updateValue)
    .then(() => {
      this.notificacionBus.showSuccess('Comment has been update');
      this.updateCommentForm.reset(); })
    .catch(err => {
      this.notificacionBus.showError(err); });

  }
}
