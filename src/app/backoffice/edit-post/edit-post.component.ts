import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommentStoreService } from '../comment-store.service';
import { PostStoreService } from '../post-store.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  id: string;
  subUpdate: Subscription;
  subAddComment: Subscription;
  post$: Observable<Post>;
  updateForm: FormGroup;
  commentForm: FormGroup;
  cols: any[];
  isAdded: boolean;
  index: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PostService,
    private storePost: PostStoreService,
    private store: CommentStoreService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.store.init(this.id);
    this.post$ = this.store.get$();

    this.commentForm = new FormGroup({
      username: new FormControl ('', Validators.required),
      nickname : new FormControl ('', Validators.required),
      comment: new FormControl ('', Validators.required),
    });



  }
  commentAdd(){
    this.isAdded = !this.isAdded;
  }

  addComment(){
  this.store.addComment$(this.id, this.commentForm.value);
  }


  ngOnDestroy() {
    if (this.subUpdate){
      this.subUpdate.unsubscribe();
    }
}
}
