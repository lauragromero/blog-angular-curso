import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostStoreService } from '../post-store.service';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  allPost$: Observable<Post[]>;

  constructor(
    private store: PostStoreService,
    ) { }

  ngOnInit(): void {
    this.store.init();
    this.allPost$ = this.store.get$();
  }

  deletePost(post: Post) {
    this.store.delete$(post._id);
  }

}
