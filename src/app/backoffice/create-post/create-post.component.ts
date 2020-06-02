import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostStoreService } from '../post-store.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{

  postForm: FormGroup;
  sub: Subscription;



  constructor(private store: PostStoreService,
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
    this.store.create$(this.postForm.value);
    this.router.navigateByUrl('/admin');
    }
  }

