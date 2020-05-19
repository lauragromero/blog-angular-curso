import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostProxyService } from '../post-proxy.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postService: PostProxyService, private router: Router) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      username: new FormControl (''),
      nickname : new FormControl (''),
      title : new FormControl (''),
      text : new FormControl ('')
    });
  }

  createPost(){
     this.postService.createPost(this.postForm.value).subscribe(res => {
      console.log('Post created!');
      this.router.navigateByUrl('/admin');

  });

}
}
