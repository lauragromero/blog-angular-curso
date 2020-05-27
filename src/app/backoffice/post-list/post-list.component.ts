import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private service: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.allPost$ = this.service.getAllPost();
  }

  deletePost(post: Post) {
    this.service.deletePost(post._id).subscribe(res => {
      console.log('Post deleted');
    });
  }

}
