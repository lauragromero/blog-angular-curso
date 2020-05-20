import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostDTO } from '../home-dto';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  post$: Observable<PostDTO>;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: HomeService) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(){
    this.id = this.activatedRoute.snapshot.params.id;
    this.post$ = this.service.getPostById(this.id);
  }

}
