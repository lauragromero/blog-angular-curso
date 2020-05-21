import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/backoffice/post.model';
import { PostService } from 'src/app/backoffice/post.service';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  post$: Observable<Post>;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PostService) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(){
    this.id = this.activatedRoute.snapshot.params.id;
    this.post$ = this.service.getPostById(this.id);
  }

}
