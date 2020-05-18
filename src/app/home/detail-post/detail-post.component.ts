import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailProxyService } from '../detail-proxy.service';


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit, OnDestroy {

  sub: Subscription;
  post: any;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private proxiDetail: DetailProxyService) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(){
    this.id = this.activatedRoute.snapshot.params.id;
    this.sub = this.proxiDetail.getPostById(this.id).subscribe((res) => {
      this.post = res;
      console.log(res);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
