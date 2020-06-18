import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from 'src/app/auth/user-store.service';
import { User } from 'src/app/auth/user.model';
import { NotificationBusService } from 'src/app/bus.service';
import { PostStoreService } from '../post-store.service';
import { Post } from '../post.model';




@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])]
})
export class PostListComponent implements OnInit {

  allPost$: Observable<Post[]>;
  user: Observable<User[]>;
  updateForm: FormGroup;
  id: string;
  isEdit: boolean;
  cols: any[];
  isRole: boolean;

  constructor(
    private router: Router,
    private store: PostStoreService,
    private notificacionBus: NotificationBusService,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.store.init();
    this.allPost$ = this.store.get$();
    this.user = this.userStore.get$();
    this.updateForm = new FormGroup({
      title : new FormControl ('', Validators.required),
      text : new FormControl ('', Validators.required)
    });
    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'nickname', header: 'Nickname' },
      { field: 'date', header: 'Date' },
      { field: 'title', header: 'Post Title' },
    ];
  }

  // userRole(){
  //   this.userStore.get$().subscribe(res => {
  //     console.log(res[0].role);
  //     if (res[0].role === 'admin' || res[0].username === this.cols.username){
  //       this.isRole = false;
  //     }else{
  //       this.isRole = true;
  //     }
  //   });
  // }

  editPost(id, ev){
    console.log(id);
    this.isEdit = !this.isEdit;
  }
  async goToPostDetail(id){
    await this.router.navigate([`admin/${id}`]);
  }
  updatePost(id){
    this.isEdit = false;
    console.log(id);
    const updateValue = this.updateForm.value;
    this.store.update$(id, updateValue)
    .then(() => {
      this.notificacionBus.showSuccess('Post has been update');
      this.updateForm.reset(); })
    .catch(err => {
      this.notificacionBus.showError('Can not update this post'); });
  }

  deletePost(id){
      this.store.delete$(id)
      .then(() => {
        this.notificacionBus.showSuccess('Post has been deleted'); })
      .catch(err => {
        console.log(err);
        this.notificacionBus.showError('Can not deleted this post'); });
    }

}
