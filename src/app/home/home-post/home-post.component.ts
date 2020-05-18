import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostDTO } from '../home-dto';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})
export class HomePostComponent implements OnInit {

  allPost$: Observable<PostDTO[]>;

  constructor(
    private homeService: HomeService,
    private router: Router) { }

  ngOnInit(): void {
    this.allPost$ = this.homeService.getAllPost();
    console.log(this.allPost$);
  }

  onSelect(postID){
    this.router.navigate(['home', postID]);
  }
}
