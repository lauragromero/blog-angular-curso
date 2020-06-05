import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private store: CommentStoreService) {
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
    console.log(idComment);
    this.store.delete$(idComment);
  }

  updateComment(idComment){
    const updateValue = this.updateCommentForm.value;
    this.store.update$(idComment, updateValue);

  }
}
