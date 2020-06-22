import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationBusService } from 'src/app/bus.service';
import { CommentStoreService } from '../comment-store.service';
import { Post } from '../post.model';



@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  id: string;
  post$: Observable<Post>;
  updateForm: FormGroup;
  commentForm: FormGroup;
  cols: any[];
  isAdded: boolean;
  index: number;
  customErrorsMessages: {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: CommentStoreService,
    private notificacionBus: NotificationBusService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.store.init(this.id);
    this.post$ = this.store.get$();
    this.commentForm = new FormGroup({
      comment: new FormControl ('', Validators.required),
    });
    this.customErrorsMessages = {
      required: 'This field must not be empty',
    };

  }
  commentAdd(){
    this.isAdded = !this.isAdded;
  }

  showError(msg){
    this.notificacionBus.showError(msg);
  }

  addComment(){
    this.isAdded = false;
    const commentAdd = this.commentForm.value;
    this.store.addComment$(this.id, commentAdd)
    .then(() => {
      this.commentForm.reset(); })
    .catch(err => {
      this.notificacionBus.showError(err.error.message); });

}

}
