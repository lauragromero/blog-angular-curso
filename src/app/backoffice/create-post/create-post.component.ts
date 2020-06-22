import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationBusService } from 'src/app/bus.service';
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
  customErrorsMessages: {};
  @Output() shows = new EventEmitter();



  constructor(private store: PostStoreService,
              private notificacionBus: NotificationBusService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
        title : new FormControl ('', Validators.required),
        text : new FormControl ('', Validators.required)
    });
    this.customErrorsMessages = {
      required: 'This field must not be empty',
    };

  }

  showCreatePostForm(){
    this.isCreate = !this.isCreate;
    this.postForm.reset();

  }

 createPost(){
   const newPostValue = this.postForm.value;
   this.isCreate = false;
   this.store.create$(newPostValue)
   .then(() => {
    this.notificacionBus.showSuccess('Post has been published');
    this.postForm.reset(); })
  .catch(err => {
    this.notificacionBus.showError(err.error.message); });
    }
  }

