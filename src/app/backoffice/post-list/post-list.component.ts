import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostDTO } from 'src/app/home/home-dto';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  allPost$: Observable<PostDTO[]>;

  constructor(
    private postService: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.allPost$ = this.postService.getAllPost();
    console.log(this.allPost$);
  }

  onSubmit(postID){
    this.router.navigate(['backoffice', postID]);
  }

}
