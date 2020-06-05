import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: CommentStoreService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.store.init(this.id);
    this.post$ = this.store.get$();
    this.commentForm = new FormGroup({
      comment: new FormControl ('', Validators.required),
    });



  }
  commentAdd(){
    this.isAdded = !this.isAdded;
  }

  addComment(){
    this.isAdded = false;
    const commentAdd = this.commentForm.value;
    this.store.addComment$(this.id, commentAdd);
    this.commentForm.reset();
  }

}
