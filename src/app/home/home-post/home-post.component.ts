import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/backoffice/post.model';
import { PostService } from 'src/app/backoffice/post.service';


@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})
export class HomePostComponent implements OnInit {

  allPost$: Observable<Post[]>;

  constructor(
    private service: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.allPost$ = this.service.getAllPost();
  }

  onSelect(postID){
    this.router.navigate(['home', postID]);
  }
}
