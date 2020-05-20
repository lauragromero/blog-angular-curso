import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostStoreService } from '../post-store.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  allPost$: Observable<Post[]>;

  constructor(
    private store: PostStoreService,
    private service: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.init();
    this.allPost$ = this.store.get$();
  }

  deletePost(post: Post) {
    this.store.delete$(post._id);
    console.log('Post deleted!');
  }

  onSubmit(postID){
    this.router.navigate(['backoffice', postID]);
  }

}
