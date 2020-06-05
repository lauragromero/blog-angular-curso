import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  isCreate: boolean;
  sub: Subscription;
  @Output() shows = new EventEmitter();



  constructor(private store: PostStoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
        title : new FormControl (''),
        text : new FormControl ('')
    });
    const userToken = localStorage.getItem('token');
    console.log(userToken);
  }

  showCreatePostForm(){
    this.isCreate = !this.isCreate;
  }

 createPost(){
   const newPostValue = this.postForm.value;
   this.isCreate = false;
   this.store.create$(newPostValue);
   this.postForm.reset();
    }
  }

