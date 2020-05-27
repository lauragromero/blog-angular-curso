import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  sub: Subscription;



  constructor(private service: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      username: new FormControl (''),
      nickname : new FormControl (''),
      title : new FormControl (''),
      text : new FormControl ('')
    });
  }

  createPost(){
    this.service.createPost(this.postForm.value)
    .subscribe(
      () => {
        console.log('Proceso completado');
      }
    );
    }


    ngOnDestroy(){
      this.sub.unsubscribe();
    }
}


