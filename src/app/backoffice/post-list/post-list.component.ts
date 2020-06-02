import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostStoreService } from '../post-store.service';
import { Post } from '../post.model';




@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])]
})
export class PostListComponent implements OnInit {

  allPost$: Observable<Post[]>;
  updateForm: FormGroup;
  id: string;
  isEdit: boolean;
  cols: any[];

  constructor(
    private store: PostStoreService,
    ) { }

  ngOnInit(): void {
    this.store.init();
    this.allPost$ = this.store.get$();
    console.log(this.allPost$);
    this.updateForm = new FormGroup({
      username: new FormControl ('', Validators.required),
      nickname : new FormControl ('', Validators.required),
      title : new FormControl ('', Validators.required),
      text : new FormControl ('', Validators.required)
    });
    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'nickname', header: 'Nickname' },
      { field: 'date', header: 'Date' },
      { field: 'title', header: 'Post Title' },
      { field: 'text', header: 'Post Text' },
    ];
  }

  editPost(id){
    console.log(id);
    this.id = id;
    this.isEdit = !this.isEdit;
  }
  updatePost(){
    console.log(this.id);
    this.store.update$(this.id, this.updateForm.value);
  }

  async deletePost(id) {
    console.log(id);
    await this.store.delete$(id);
  }

}
