import { Component, OnInit } from '@angular/core';
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

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.allPost$ = this.homeService.getAllPost();
  }

}
